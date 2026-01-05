// Data Guru SMK Negeri 1 Ngawen

export interface Teacher {
  id: string;
  nip: string;
  nama: string;
  email: string;
  password: string;
  mataPelajaran: string[];
  kelasAjar: string[];
  jurusan: string[];
}

export const teachers: Teacher[] = [
  {
    id: "GR001",
    nip: "198501152010011001",
    nama: "Drs. BAMBANG SUPRIYADI, M.Pd.",
    email: "bambang.guru@smkn1ngawen.sch.id",
    password: "bambang123",
    mataPelajaran: ["Pendidikan Agama Islam"],
    kelasAjar: ["X DPIB", "X TAB", "X TB", "X TKJ", "X TKR 1", "X TKR 2", "XI DPIB", "XI TAB", "XI TB", "XI TKJ", "XI TKR 1", "XI TKR 2"],
    jurusan: ["DPIB", "TAB", "TB", "TKJ", "TKR"]
  },
  {
    id: "GR002",
    nip: "198708232011012002",
    nama: "SRI WAHYUNI, S.Pd.",
    email: "sriwahyuni.guru@smkn1ngawen.sch.id",
    password: "sriwahyuni123",
    mataPelajaran: ["Pendidikan Pancasila dan Kewarganegaraan"],
    kelasAjar: ["X DPIB", "X TAB", "X TB", "X TKJ", "X TKR 1", "X TKR 2", "XI DPIB", "XI TAB", "XI TB", "XI TKJ", "XI TKR 1", "XI TKR 2"],
    jurusan: ["DPIB", "TAB", "TB", "TKJ", "TKR"]
  },
  {
    id: "GR003",
    nip: "199003122014021003",
    nama: "AGUS TRIYONO, S.Pd.",
    email: "agustriyono.guru@smkn1ngawen.sch.id",
    password: "agustriyono123",
    mataPelajaran: ["Bahasa Indonesia"],
    kelasAjar: ["X DPIB", "X TAB", "X TB", "X TKJ", "XI DPIB", "XI TAB", "XI TB", "XI TKJ"],
    jurusan: ["DPIB", "TAB", "TB", "TKJ"]
  },
  {
    id: "GR004",
    nip: "198912052015032004",
    nama: "DEWI RATNA SARI, S.Pd.",
    email: "dewiratna.guru@smkn1ngawen.sch.id",
    password: "dewiratna123",
    mataPelajaran: ["Matematika"],
    kelasAjar: ["X DPIB", "X TAB", "X TKJ", "X TKR 1", "X TKR 2", "XI DPIB", "XI TAB", "XI TKJ", "XI TKR 1", "XI TKR 2"],
    jurusan: ["DPIB", "TAB", "TKJ", "TKR"]
  },
  {
    id: "GR005",
    nip: "198606172011011005",
    nama: "HENDRA WIJAYA, S.Pd., M.Eng.",
    email: "hendrawijaya.guru@smkn1ngawen.sch.id",
    password: "hendrawijaya123",
    mataPelajaran: ["Bahasa Inggris"],
    kelasAjar: ["X DPIB", "X TAB", "X TB", "X TKJ", "X TKR 1", "XI DPIB", "XI TAB", "XI TB", "XI TKJ", "XI TKR 1"],
    jurusan: ["DPIB", "TAB", "TB", "TKJ", "TKR"]
  },
  {
    id: "GR006",
    nip: "199104082016041006",
    nama: "RIZKI FIRMANSYAH, S.Kom.",
    email: "rizkifirmansyah.guru@smkn1ngawen.sch.id",
    password: "rizkifirmansyah123",
    mataPelajaran: ["Informatika", "Dasar Program Keahlian TKJ"],
    kelasAjar: ["X TKJ", "XI TKJ"],
    jurusan: ["TKJ"]
  },
  {
    id: "GR007",
    nip: "198805152012022007",
    nama: "NURUL HIDAYAH, S.Pd.",
    email: "nurulhidayah.guru@smkn1ngawen.sch.id",
    password: "nurulhidayah123",
    mataPelajaran: ["Pendidikan Jasmani, Olahraga dan Kesehatan"],
    kelasAjar: ["X DPIB", "X TAB", "X TB", "X TKJ", "X TKR 1", "X TKR 2", "XI DPIB", "XI TAB", "XI TB", "XI TKJ", "XI TKR 1", "XI TKR 2"],
    jurusan: ["DPIB", "TAB", "TB", "TKJ", "TKR"]
  },
  {
    id: "GR008",
    nip: "199207252018011008",
    nama: "YOGA PRATAMA, S.T.",
    email: "yogapratama.guru@smkn1ngawen.sch.id",
    password: "yogapratama123",
    mataPelajaran: ["Gambar Teknik", "Dasar Program Keahlian DPIB", "Konstruksi Bangunan"],
    kelasAjar: ["X DPIB", "XI DPIB"],
    jurusan: ["DPIB"]
  },
  {
    id: "GR009",
    nip: "198503082009032009",
    nama: "SITI AMINAH, S.Pd.",
    email: "sitiaminah.guru@smkn1ngawen.sch.id",
    password: "sitiaminah123",
    mataPelajaran: ["Seni Budaya"],
    kelasAjar: ["X DPIB", "X TAB", "X TB", "X TKJ", "X TKR 1", "X TKR 2"],
    jurusan: ["DPIB", "TAB", "TB", "TKJ", "TKR"]
  },
  {
    id: "GR010",
    nip: "199009142019031010",
    nama: "MUHAMMAD ARIF, S.T.",
    email: "muhammadarif.guru@smkn1ngawen.sch.id",
    password: "muhammadarif123",
    mataPelajaran: ["Dasar Program Keahlian TAB", "Teknik Alat Berat", "Sistem Hidrolik"],
    kelasAjar: ["X TAB", "XI TAB"],
    jurusan: ["TAB"]
  },
  {
    id: "GR011",
    nip: "198711202010012011",
    nama: "RETNO WULANDARI, S.Pd.",
    email: "retnowulandari.guru@smkn1ngawen.sch.id",
    password: "retnowulandari123",
    mataPelajaran: ["Dasar Program Keahlian TB", "Desain Busana", "Pembuatan Pola"],
    kelasAjar: ["X TB", "XI TB"],
    jurusan: ["TB"]
  },
  {
    id: "GR012",
    nip: "199305182020041012",
    nama: "DANI KURNIAWAN, S.T.",
    email: "danikurniawan.guru@smkn1ngawen.sch.id",
    password: "danikurniawan123",
    mataPelajaran: ["Dasar Program Keahlian TKR", "Motor Otomotif", "Kelistrikan Kendaraan"],
    kelasAjar: ["X TKR 1", "X TKR 2", "X TKR 3", "X TKR 4", "XI TKR 1", "XI TKR 2", "XI TKR 3", "XI TKR 4"],
    jurusan: ["TKR"]
  },
  {
    id: "GR013",
    nip: "198404252008011013",
    nama: "SURYA DHARMA, S.Pd., M.Pd.",
    email: "suryadharma.guru@smkn1ngawen.sch.id",
    password: "suryadharma123",
    mataPelajaran: ["Bimbingan Konseling"],
    kelasAjar: ["X DPIB", "X TAB", "X TB", "X TKJ", "X TKR 1", "X TKR 2", "XI DPIB", "XI TAB", "XI TB", "XI TKJ", "XI TKR 1", "XI TKR 2"],
    jurusan: ["DPIB", "TAB", "TB", "TKJ", "TKR"]
  },
  {
    id: "GR014",
    nip: "199108302017022014",
    nama: "ANITA PERMATASARI, S.Pd.",
    email: "anitapermatasari.guru@smkn1ngawen.sch.id",
    password: "anitapermatasari123",
    mataPelajaran: ["Sejarah Indonesia"],
    kelasAjar: ["X DPIB", "X TAB", "X TB", "X TKJ", "X TKR 1", "X TKR 2"],
    jurusan: ["DPIB", "TAB", "TB", "TKJ", "TKR"]
  },
  {
    id: "GR015",
    nip: "198602112011011015",
    nama: "EKO PRASETYO, S.T., M.T.",
    email: "ekoprasetyo.guru@smkn1ngawen.sch.id",
    password: "ekoprasetyo123",
    mataPelajaran: ["Jaringan Komputer", "Administrasi Server"],
    kelasAjar: ["XI TKJ"],
    jurusan: ["TKJ"]
  },
  {
    id: "GR016",
    nip: "199412082021042016",
    nama: "PUTRI HANDAYANI, S.Pd.",
    email: "putrihandayani.guru@smkn1ngawen.sch.id",
    password: "putrihandayani123",
    mataPelajaran: ["Bahasa Indonesia"],
    kelasAjar: ["X TKR 1", "X TKR 2", "X TKR 3", "X TKR 4", "XI TKR 1", "XI TKR 2", "XI TKR 3", "XI TKR 4"],
    jurusan: ["TKR"]
  },
  {
    id: "GR017",
    nip: "198907152013031017",
    nama: "AHMAD FAUZI, S.T.",
    email: "ahmadfauzi.guru@smkn1ngawen.sch.id",
    password: "ahmadfauzi123",
    mataPelajaran: ["CAD/CAM", "Estimasi Biaya Konstruksi"],
    kelasAjar: ["XI DPIB"],
    jurusan: ["DPIB"]
  },
  {
    id: "GR018",
    nip: "199201222018012018",
    nama: "LINDA PERMATA, S.Pd.",
    email: "lindapermata.guru@smkn1ngawen.sch.id",
    password: "lindapermata123",
    mataPelajaran: ["Matematika"],
    kelasAjar: ["X TB", "XI TB"],
    jurusan: ["TB"]
  },
  {
    id: "GR019",
    nip: "198810102014021019",
    nama: "FAJAR NUGROHO, S.T.",
    email: "fajarnugroho.guru@smkn1ngawen.sch.id",
    password: "fajarnugroho123",
    mataPelajaran: ["Chasis dan Pemindah Tenaga", "Perawatan Berkala Kendaraan"],
    kelasAjar: ["XI TKR 1", "XI TKR 2", "XI TKR 3", "XI TKR 4"],
    jurusan: ["TKR"]
  },
  {
    id: "GR020",
    nip: "199506172022041020",
    nama: "RAKA ADITYA, S.Kom.",
    email: "rakaaditya.guru@smkn1ngawen.sch.id",
    password: "rakaaditya123",
    mataPelajaran: ["Pemrograman Web", "Basis Data"],
    kelasAjar: ["XI TKJ"],
    jurusan: ["TKJ"]
  },
];

// Helper function untuk mencari guru berdasarkan jurusan
export const getTeachersByJurusan = (jurusan: string) => {
  return teachers.filter(t => t.jurusan.includes(jurusan));
};

// Helper function untuk mencari guru berdasarkan mata pelajaran
export const getTeachersByMapel = (mapel: string) => {
  return teachers.filter(t => t.mataPelajaran.includes(mapel));
};

// Helper function untuk mencari guru berdasarkan kelas
export const getTeachersByKelas = (kelas: string) => {
  return teachers.filter(t => t.kelasAjar.includes(kelas));
};
