// Data Nilai Siswa SMK Negeri 1 Ngawen

export interface Grade {
  id: string;
  studentId: string;
  subjectId: string;
  semester: number;
  tahunAjaran: string;
  nilaiPengetahuan: number;
  nilaiKeterampilan: number;
  nilaiAkhir: number;
  predikat: string;
  deskripsi: string;
}

// Helper function to generate grade description
export const generateDeskripsi = (mapel: string, nilai: number): string => {
  if (nilai >= 90) {
    return `Menguasai seluruh kompetensi ${mapel} dengan sangat baik dan mampu menerapkannya dalam berbagai situasi.`;
  } else if (nilai >= 80) {
    return `Menguasai sebagian besar kompetensi ${mapel} dengan baik dan mampu menerapkannya.`;
  } else if (nilai >= 70) {
    return `Menguasai kompetensi dasar ${mapel} dan perlu meningkatkan pemahaman pada beberapa aspek.`;
  } else {
    return `Perlu bimbingan lebih lanjut untuk menguasai kompetensi ${mapel}.`;
  }
};

// Helper function to get predikat based on nilai
export const getPredikat = (nilai: number): string => {
  if (nilai >= 90) return "A";
  if (nilai >= 80) return "B";
  if (nilai >= 70) return "C";
  return "D";
};

// Sample grades for demonstration (Semester 3 - currently active)
export const sampleGrades: Grade[] = [];

// Generate sample grades for some students
export const generateSampleGrade = (
  studentId: string,
  subjectId: string,
  semester: number = 3
): Grade => {
  const nilaiPengetahuan = Math.floor(Math.random() * 25) + 75; // 75-100
  const nilaiKeterampilan = Math.floor(Math.random() * 25) + 75; // 75-100
  const nilaiAkhir = Math.round((nilaiPengetahuan + nilaiKeterampilan) / 2);
  
  return {
    id: `GRD-${studentId}-${subjectId}-${semester}`,
    studentId,
    subjectId,
    semester,
    tahunAjaran: "2023/2024",
    nilaiPengetahuan,
    nilaiKeterampilan,
    nilaiAkhir,
    predikat: getPredikat(nilaiAkhir),
    deskripsi: generateDeskripsi("mata pelajaran ini", nilaiAkhir),
  };
};

// Current active semester
export const currentSemester = 3;
export const currentTahunAjaran = "2023/2024";

// School info
export const schoolInfo = {
  nama: "SMK NEGERI 1 NGAWEN",
  npsn: "20407368",
  alamat: "Jl. Raya Ngawen - Muntilan, Ngawen, Gunungkidul, DI Yogyakarta",
  kepalaSekolah: "Drs. SUPARNO, M.Pd.",
  nipKepalaSekolah: "196508151990031005",
  telepon: "(0274) 392845",
  email: "info@smkn1ngawen.sch.id",
  website: "www.smkn1ngawen.sch.id",
};
