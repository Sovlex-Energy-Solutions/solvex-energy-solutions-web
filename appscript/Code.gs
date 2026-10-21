/**
 * ==============================================================================
 * Solvex Energy Solutions - Leads Ingestion Web App (Google Apps Script)
 * ==============================================================================
 * 
 * CRITICAL DEPLOYMENT INSTRUCTIONS (PLEASE READ CAREFULLY):
 * ------------------------------------------------------------------------------
 * If the entry does not appear in your Google Sheet, it is almost always because
 * of Step 7 below (Access Permissions):
 * 
 * 1. Open your Google Sheet (e.g., https://sheets.new).
 * 2. In Google Sheets top menu, click: "Extensions" -> "Apps Script".
 * 3. Delete ANY existing code in Code.gs and replace it with this entire script.
 * 4. (Optional) If you created this script at script.google.com instead of from
 *    inside a sheet, paste your Sheet ID into SPREADSHEET_ID below.
 * 5. To TEST immediately inside Google Apps Script:
 *    - In the function dropdown at top (next to 'Debug'), select 'testSaveLead'.
 *    - Click the 'Run' button.
 *    - Click 'Review permissions' -> Select your Google account -> 'Advanced' -> 'Go to Solvex Leads (unsafe)' -> 'Allow'.
 *    - Check your Google Sheet: A test row should appear immediately!
 * 6. Click the blue "Deploy" button (top right) -> "New deployment" 
 *    (or "Manage deployments" -> edit icon -> "New version" if updating).
 * 7. In the Deployment dialog:
 *    - Select type: "Web app" (gear icon)
 *    - Description: "Solvex Leads Webhook v2"
 *    - Execute as: "Me" (your Google account)
 *    - WHO HAS ACCESS: "Anyone"  <--- *** CRITICAL! ***
 *      (If you leave this as 'Only myself', Google blocks submissions with 401 Unauthorized!)
 * 8. Click "Deploy".
 * 9. Copy the "Web app URL" (ends with /exec).
 * 10. Paste this URL into your website's .env file:
 *     GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
 * ==============================================================================
 */

// OPTIONAL: Only needed if this script is NOT created via Extensions -> Apps Script inside the sheet
var SPREADSHEET_ID = ""; // e.g. "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"

// Helper to format ISO Date to IST (Indian Standard Time)
function getFormattedISTDate(dateObj) {
  return Utilities.formatDate(dateObj || new Date(), "Asia/Kolkata", "dd/MM/yyyy, hh:mm:ss a");
}

// Map technical values to friendly names
function formatTier(tier) {
  var map = {
    "distributor": "Distributor Partner (Territory)",
    "master": "Master Distributor (State / Zone)",
    "channel": "Channel EPC Partner",
    "merchant": "Retail Merchant Store"
  };
  return map[tier] || tier || "-";
}

function formatCapital(capital) {
  var map = {
    "tier1": "₹2,00,000 - ₹5,00,000",
    "tier2": "₹5,00,000 - ₹15,00,000",
    "tier3": "₹15,00,000 - ₹30,00,000",
    "tier4": "₹30,00,000+ (Institutional Master)"
  };
  return map[capital] || capital || "-";
}

/**
 * Get or initialize the active spreadsheet & target sheet tab
 */
function getTargetSheet(sheetName) {
  var ss = null;
  try {
    ss = SpreadsheetApp.getActiveSpreadsheet();
  } catch (e) {
    ss = null;
  }

  if (!ss && SPREADSHEET_ID && SPREADSHEET_ID.trim() !== "") {
    try {
      ss = SpreadsheetApp.openById(SPREADSHEET_ID.trim());
    } catch (e) {
      Logger.log("Error opening spreadsheet by ID: " + e);
    }
  }

  if (!ss) {
    throw new Error(
      "Spreadsheet not found! Please open your Google Sheet, click Extensions > Apps Script, and paste this code there. " +
      "Or set SPREADSHEET_ID at the top of Code.gs."
    );
  }

  var targetName = sheetName || "Franchise Leads";
  var sheet = ss.getSheetByName(targetName);
  if (!sheet) {
    // If it's the first run on default "Sheet1", rename or create
    if (ss.getSheets().length === 1 && ss.getSheets()[0].getLastRow() === 0) {
      sheet = ss.getSheets()[0];
      sheet.setName(targetName);
    } else {
      sheet = ss.insertSheet(targetName);
    }
  }

  if (sheet.getLastRow() === 0) {
    setupSheetHeaders(sheet);
  }

  return sheet;
}

/**
 * Core lead saving logic used by both doPost and doGet
 */
function processLead(data) {
  var lock = LockService.getScriptLock();
  lock.tryLock(30000);

  try {
    var sheet = getTargetSheet("Franchise Leads");

    var timestamp = getFormattedISTDate(new Date());
    var referenceId = data.referenceId || data.ref || ("SLX-PRT-" + Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy") + "-" + Math.floor(10000 + Math.random() * 90000));
    var firstName = data.firstName || data.first_name || "";
    var lastName = data.lastName || data.last_name || "";
    var fullName = data.fullName || data.full_name || (firstName + " " + lastName).trim();
    var email = data.email || "";
    var rawPhone = data.phone || data.mobile || "";
    var phone = rawPhone ? ("'" + rawPhone) : "";
    var city = data.city || data.district || "";
    var state = data.state || "Rajasthan";
    var partnershipTier = formatTier(data.partnershipType || data.tier || data.productInterest || "");
    var capitalBand = formatCapital(data.investmentCapacity || data.capital || data.monthlyBill || "");
    var experience = data.experience || data.notes || data.background || "";
    var channelSource = data.channelSource || data.source || "website_franchise_form";
    var status = data.status || "NEW_LEAD";

    // Append lead row
    sheet.appendRow([
      timestamp,
      referenceId,
      firstName,
      lastName,
      fullName,
      email,
      phone,
      city,
      state,
      partnershipTier,
      capitalBand,
      experience,
      channelSource,
      status
    ]);

    var lastRow = sheet.getLastRow();

    // Style the status badge
    try {
      sheet.getRange(lastRow, 14).setBackground("#D1FAE5").setFontColor("#065F46").setFontWeight("bold");
    } catch (e) {}

    return {
      success: true,
      message: "Lead recorded successfully in Google Sheet",
      referenceId: referenceId,
      rowNumber: lastRow
    };
  } finally {
    lock.releaseLock();
  }
}

/**
 * Handle POST requests (from Next.js fetch)
 */
function doPost(e) {
  try {
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    } else {
      data = { note: "Empty POST received" };
    }

    var result = processLead(data);

    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests
 * Supports testing via browser URL:
 * https://script.google.com/macros/s/.../exec?test=1
 * OR
 * https://script.google.com/macros/s/.../exec?firstName=Shaan&lastName=Alam&phone=9125127755&city=Jaipur
 */
function doGet(e) {
  try {
    // If query parameters for a lead are passed (or fallback test)
    if (e && e.parameter && (e.parameter.phone || e.parameter.firstName || e.parameter.test)) {
      var data = e.parameter;
      if (data.test) {
        data.firstName = data.firstName || "Shaan (Test)";
        data.lastName = data.lastName || "Alam";
        data.phone = data.phone || "9125127755";
        data.city = data.city || "Jaipur";
        data.partnershipType = data.partnershipType || "distributor";
        data.investmentCapacity = data.investmentCapacity || "tier2";
      }
      var result = processLead(data);
      return ContentService
        .createTextOutput(JSON.stringify(result))
        .setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService
      .createTextOutput(JSON.stringify({
        status: "ONLINE",
        service: "Solvex Energy Solutions - Franchise Ingestion API",
        message: "Endpoint active. Send POST or test with ?test=1 in browser URL.",
        timestamp: getFormattedISTDate(new Date())
      }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * ONE-CLICK TEST FUNCTION:
 * Run this directly in Apps Script editor by selecting 'testSaveLead' and clicking 'Run'.
 */
function testSaveLead() {
  var testData = {
    firstName: "Shaan",
    lastName: "Alam",
    fullName: "Shaan Alam",
    email: "Infosolvexenergysoltuion@gmail.com",
    phone: "9125127755",
    city: "Jaipur",
    state: "Rajasthan",
    partnershipType: "distributor",
    investmentCapacity: "tier2",
    experience: "Electrical distribution footprint test",
    channelSource: "apps_script_editor_direct_test"
  };

  var res = processLead(testData);
  Logger.log("Result: " + JSON.stringify(res, null, 2));
}

/**
 * Setup sheet headers with Solvex emerald branding
 */
function setupSheetHeaders(sheet) {
  var headers = [
    "Timestamp (IST)",
    "Reference ID",
    "First Name",
    "Last Name",
    "Full Name",
    "Official Email",
    "Mobile Number",
    "Target City / District",
    "State",
    "Partnership Tier",
    "Capital Band",
    "Business Background / Experience",
    "Channel Source",
    "Lead Status"
  ];

  sheet.appendRow(headers);

  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange
    .setBackground("#059669")
    .setFontColor("#FFFFFF")
    .setFontWeight("bold")
    .setFontFamily("Arial")
    .setFontSize(11)
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle");

  sheet.setRowHeight(1, 38);
  sheet.setFrozenRows(1);

  sheet.setColumnWidth(1, 180);
  sheet.setColumnWidth(2, 170);
  sheet.setColumnWidth(3, 130);
  sheet.setColumnWidth(4, 130);
  sheet.setColumnWidth(5, 170);
  sheet.setColumnWidth(6, 240);
  sheet.setColumnWidth(7, 150);
  sheet.setColumnWidth(8, 180);
  sheet.setColumnWidth(9, 130);
  sheet.setColumnWidth(10, 220);
  sheet.setColumnWidth(11, 200);
  sheet.setColumnWidth(12, 320);
  sheet.setColumnWidth(13, 190);
  sheet.setColumnWidth(14, 140);
}
