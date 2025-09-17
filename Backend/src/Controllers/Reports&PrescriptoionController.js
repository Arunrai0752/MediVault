import Reports from "../Models/Reports.js";
import Prescription from "../Models/Prescription.js";
import cloudinary from "../Configs/cloudinary.js";
import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import Patient from "../Models/PatientsModel.js";
import Doctor from "../Models/DoctorModel.js";




export const saveTypedPrescription = async (req, res) => {
  try {
    const { diagnosis, medicines, notes, nextVisit } = req.body;
    const patientId = req.params.id;
    const doctorId = req.user?._id;

    const patient = await Patient.findById({_id : patientId})
    const doctor =await  Doctor.findById({_id : doctorId})

    if (!diagnosis || !medicines?.length) {
      return res.status(400).json({ message: "Missing required fields" });
    }
  const html = `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Prescription</title>
        <style>
          /* Simple paper-like prescription styling */
          body {
            font-family: 'Times New Roman', Georgia, serif;
            color: #111;
            margin: 0;
            padding: 24px;
            background: #fff;
          }
          .prescription {
            max-width: 800px;
            margin: 0 auto;
            padding: 18px 22px;
            border: 1px solid #ddd;
            background: #fff;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px dashed #ccc;
            padding-bottom: 8px;
            margin-bottom: 12px;
          }
          .doc-left { font-weight: 700; font-size: 20px; }
          .doc-right { text-align: right; font-size: 12px; color: #333; }
          .patient-info { margin: 8px 0 14px; font-size: 14px; }
          .section-title { font-weight: 700; margin-top: 8px; margin-bottom: 6px; }
          .diagnosis { font-size: 15px; margin-bottom: 10px; }
          .rx-list { margin: 6px 0 12px; }
          .rx-item { margin-bottom: 8px; font-size: 15px; }
          .notes { margin-top: 8px; font-size: 13px; color: #333; }
          .footer { margin-top: 22px; border-top: 1px dashed #ccc; padding-top: 8px; font-size: 12px; }
          @media print {
            body { padding: 0; }
            .prescription { border: none; box-shadow: none; }
          }
        </style>
      </head>
      <body>
        <div class="prescription">
          <div class="header">
            <div class="doc-left">
              Dr. ${doctor.fullName}
              <div style="font-weight:400; font-size:13px;">${doctor.specialization || ''}</div>
            </div>
            <div class="doc-right">
              ID: ${doctor._id}
              <div>Phone: ${doctor.phone || '—'}</div>
            </div>
          </div>

          <div class="patient-info">
            <div><strong>Patient:</strong> ${patient.fullName || '—'}</div>
            <div><strong>Age / Gender:</strong> ${patient.age || '—'} / ${patient.gender || '—'}</div>
            <div><strong>Date:</strong> ${new Date().toLocaleDateString()}</div>
          </div>

          <div class="diagnosis">
            <div class="section-title">Diagnosis</div>
            <div>${diagnosis}</div>
          </div>

          <div class="rx-list">
            <div class="section-title">Prescription (Rx)</div>
            ${medicines.map((m, i) => `
              <div class="rx-item"><strong>${i + 1}.</strong> ${m.name} — ${m.dose || ''} ${m.duration ? '- for ' + m.duration : ''}</div>
            `).join('')}
          </div>

          ${notes ? `<div class="notes"><div class="section-title">Notes</div><div>${notes}</div></div>` : ''}

          ${nextVisit ? `<div class="notes"><div class="section-title">Next Visit</div><div>${new Date(nextVisit).toDateString()}</div></div>` : ''}

          <div class="footer">Signature: ____________________________</div>
        </div>
      </body>
    </html>
  `;

    // 🚀 Puppeteer screenshot (improved quality)
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      // defaultViewport may be overridden per-page but provides a safe default
      defaultViewport: { width: 1200, height: 450, deviceScaleFactor: 2 },
    });

    const page = await browser.newPage();
    // ensure a crisp render by setting a larger viewport and device scale
    await page.setViewport({ width: 1200, height: 450, deviceScaleFactor: 2 });
    await page.setContent(html, { waitUntil: "networkidle0" });
    // wait for webfonts (if any) to finish loading for better text rendering
    try {
      await page.evaluateHandle('document.fonts.ready');
    } catch (e) {
      // non-critical
    }

    // Take screenshot as PNG (lossless) for best clarity when converting or uploading
    const fileName = `prescription_${uuidv4()}.png`;
    const filePath = path.join(process.cwd(), "temp", fileName);

    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    await page.screenshot({ path: filePath, type: "png", fullPage: true });

    await browser.close();

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      folder: "MedicalDoc/Prescriptions",
      resource_type: "image",
    });

    fs.unlinkSync(filePath);

    // Save record in DB
    const newPrescription = await Prescription.create({
      patientId,
      doctorId,
      diagnosis,
      medicines,
      notes,
      nextVisit,
      date: Date.now(),
      fileUrl: uploadResult.secure_url,
    });

    res.status(201).json({
      message: "Prescription image saved successfully ✅",
      data: newPrescription,
    });
  } catch (error) {
    console.error("Save prescription image error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



export const uploadReports = async (req, res) => {
  const patientId = req.params.id;
  const doctorId = req.user?._id;

  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const uploadPromises = req.files.map(async (file) => {
      const fileBase64 = file.buffer.toString("base64");
      const dataURI = `data:${file.mimetype};base64,${fileBase64}`;

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "MedicalDoc/Reports",
        resource_type: "auto",
      });

      return await Reports.create({
        patientId,
        doctorId,
        fileUrl: result.secure_url,
        reportType: req.body.reportTypes,
      });
    });

    const newReports = await Promise.all(uploadPromises);

    res.status(200).json({
      message: "Reports uploaded & saved successfully ✅",
      data: newReports,
    });
  } catch (error) {
    console.error("Upload error:", error.message);
    res.status(500).json({
      message: "Upload failed ❌",
      error: error.message,
    });
  }
};
