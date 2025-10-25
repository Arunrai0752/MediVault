const fs = require('fs');
const path = require('path');

const doctors = [
  'Anesthesiologist',
  'Cardiologist',
  'Dentist',
  'Dermoologist', // Dermatologist
  'Endocrinologist',
  'ENT',
  'Gastroenterologist',
  'General_Physician',
  'Gynecologist',
  'Hematologist',
  'Nephrologist',
  'Neurologist',
  'Oncologist',
  'Ophthalmologist',
  'Orthopedic',
  'Pathologist',
  'Pediatrician',
  'Plastic_Surgeon',
  'Psychiatrist',
  'Pulmonologist',
  'Radiologist',
  'Rheumatologist',
  'Urologist'
];

const specialtyPages = {
  'Cardiologist': ['ECGReports', 'HeartMonitoring'],
  'Dentist': ['DentalRecords', 'XRayUploads'],
  'Dermoologist': ['SkinGallery', 'PrescribedCreams'], // Dermatologist
  'ENT': ['AudioTests'],
  'Gastroenterologist': ['EndoscopyReports'],
  'Gynecologist': ['PregnancyTracker', 'UltrasoundReports'],
  'Hematologist': ['BloodReports'],
  'Nephrologist': ['KidneyTests'],
  'Neurologist': ['BrainScans', 'NeuroNotes'],
  'Oncologist': ['ChemoSessions', 'CancerReports'],
  'Ophthalmologist': ['VisionTests'],
  'Orthopedic': ['BoneXRays', 'PhysioNotes'],
  'Pathologist': ['LabReports'],
  'Pediatrician': ['VaccinationSchedule', 'GrowthTracker'],
  'Plastic_Surgeon': ['SurgeryGallery', 'SurgeryNotes'],
  'Psychiatrist': ['SessionNotes', 'MedicationLogs'],
  'Pulmonologist': ['LungReports', 'ChestXRays'],
  'Radiologist': ['ImagingUploads', 'ScanApprovals'],
  'Rheumatologist': ['JointReports', 'AutoimmuneTests'],
  'Urologist': ['UrineTests', 'KidneyImaging']
};

const basePages = ['Dashboard', 'Appointments', 'Patients', 'Profile'];

const generateComponent = (pageName, doctorType) => {
  return `import React from "react";

const ${pageName} = () => (
  <div className="p-6 text-center text-xl font-semibold">
    This is the ${pageName} page for ${doctorType.replace('_', ' ')}
  </div>
);

export default ${pageName};
`;
};

doctors.forEach(doctor => {
  const doctorPath = path.join(__dirname, 'src', 'components', 'Diff_Doc_Dash', doctor);

  // Ensure directory exists
  if (!fs.existsSync(doctorPath)) {
    fs.mkdirSync(doctorPath, { recursive: true });
  }

  // Create base pages
  basePages.forEach(page => {
    const filePath = path.join(doctorPath, `${page}.jsx`);
    const content = generateComponent(page, doctor);
    fs.writeFileSync(filePath, content);
  });

  // Create specialty pages if not General_Physician or Anesthesiologist
  if (doctor !== 'General_Physician' && doctor !== 'Anesthesiologist' && specialtyPages[doctor]) {
    specialtyPages[doctor].forEach(page => {
      const filePath = path.join(doctorPath, `${page}.jsx`);
      const content = generateComponent(page, doctor);
      fs.writeFileSync(filePath, content);
    });
  }
});

console.log('All components generated successfully!');
