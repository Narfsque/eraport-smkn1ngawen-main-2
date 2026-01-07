import { useState, useRef } from 'react';
import DashboardLayout from './DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, BookOpen, Award, Download, Printer } from 'lucide-react';
import { Student } from '@/data/students';
import { getSubjectsByJurusan } from '@/data/subjects';
import { currentSemester, schoolInfo, getPredikat } from '@/data/grades';
import { generatePDF, printElement } from '@/lib/pdf-utils';
import { toast } from 'sonner';
import { teachers } from '@/data/teachers';

type ActiveMenu = 'overview' | 'raport' | 'profile';

const StudentDashboard = () => {
  const { user } = useAuth();
  const student = user?.data as Student;
  const [activeMenu, setActiveMenu] = useState<ActiveMenu>('overview');
  const [selectedSemester, setSelectedSemester] = useState<string>('3');
  const raportRef = useRef<HTMLDivElement>(null);

  const subjects = getSubjectsByJurusan(student?.jurusan || '');

  // Generate sample grades for selected semester
  const generateGradesForSemester = (semester: number) => {
    return subjects.map((subject) => {
      // Use deterministic values based on subject and semester for consistency
      const seed = (subject.id.charCodeAt(0) + semester) % 20;
      const p = 80 + seed;
      const k = 80 + ((seed + 5) % 20);
      const avg = Math.round((p + k) / 2);
      return {
        ...subject,
        pengetahuan: p,
        keterampilan: k,
        nilaiAkhir: avg,
        predikat: getPredikat(avg),
      };
    });
  };

  const sampleGrades = generateGradesForSemester(parseInt(selectedSemester));
  const rataRata = Math.round(sampleGrades.reduce((a, b) => a + b.nilaiAkhir, 0) / sampleGrades.length);

  const signatureSvg = (name: string, width = 260, height = 60) => {
    const safeName = name || '';
    const svg = `
      <svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'>
        <rect width='100%' height='100%' fill='transparent'/>
        <text x='50%' y='60%' dominant-baseline='middle' text-anchor='middle' font-family='Great Vibes, "Brush Script MT", "Pacifico", cursive' font-size='28' fill='#0b1220' style='transform: rotate(-4deg);'>${safeName}</text>
      </svg>
    `;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  };

  const sidebar = (
    <nav className="space-y-1">
      {[
        { id: 'overview', label: 'Ringkasan', icon: FileText },
        { id: 'raport', label: 'Raport Semester 3', icon: BookOpen },
        { id: 'profile', label: 'Profil Saya', icon: Award },
      ].map((item) => (
        <Button
          key={item.id}
          variant={activeMenu === item.id ? 'secondary' : 'ghost'}
          className="w-full justify-start"
          onClick={() => setActiveMenu(item.id as ActiveMenu)}
        >
          <item.icon className="w-4 h-4 mr-2" />
          {item.label}
        </Button>
      ))}
    </nav>
  );

  return (
    <DashboardLayout title="Dashboard Siswa" sidebar={sidebar}>
      {activeMenu === 'overview' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Selamat Datang, {student?.nama}</h2>
            <p className="text-muted-foreground">
              {student?.kelas} - {student?.jurusan} | Semester {currentSemester}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <BookOpen className="w-10 h-10 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Mata Pelajaran</p>
                    <p className="text-2xl font-bold">{subjects.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Award className="w-10 h-10 text-green-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Rata-rata Nilai</p>
                    <p className="text-2xl font-bold">{rataRata}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <FileText className="w-10 h-10 text-orange-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Semester</p>
                    <p className="text-2xl font-bold">{currentSemester}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Aksi Cepat</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button onClick={() => setActiveMenu('raport')}>
                <FileText className="w-4 h-4 mr-2" />
                Lihat Raport
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  if (raportRef.current) {
                    generatePDF(raportRef.current, `Raport_${student?.nama}_Semester${currentSemester}.pdf`);
                    toast.success('PDF berhasil diunduh!');
                  }
                }}
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {activeMenu === 'raport' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
            <div>
              <h2 className="text-2xl font-bold">Raport Siswa</h2>
              <p className="text-muted-foreground">Tahun Ajaran 2023/2024</p>
            </div>
            <div className="flex gap-2 items-center">
              <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Pilih Semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Semester 1 (Ganjil)</SelectItem>
                  <SelectItem value="2">Semester 2 (Genap)</SelectItem>
                  <SelectItem value="3">Semester 3 (Ganjil)</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                variant="outline"
                onClick={() => {
                  if (raportRef.current) {
                    printElement(raportRef.current);
                  }
                }}
              >
                <Printer className="w-4 h-4 mr-2" />
                Cetak
              </Button>
              {/* Debug Print removed — print and download now open standalone view to ensure reliable rendering */}
              <Button 
                onClick={() => {
                  if (raportRef.current) {
                    generatePDF(raportRef.current, `Raport_${student?.nama}_Semester${selectedSemester}.pdf`);
                    toast.success('PDF berhasil diunduh!');
                  }
                }}
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>

          <div ref={raportRef} className="bg-white p-8 rounded-lg border print:p-0 print:border-0">
            <style>{`
              @media print {
                body { margin: 0; padding: 0; }
                .print\\:p-0 { padding: 0; }
                .print\\:border-0 { border: none; }
                .no-print { display: none; }
                .raport-container {
                  page-break-after: avoid;
                  font-family: 'Times New Roman', serif;
                }
                table { width: 100%; border-collapse: collapse; }
                td, th { border: 1px solid #000; padding: 8px; }
                .text-center { text-align: center; }
              }
            `}</style>
            <div className="raport-container">
              {/* Header */}
              <div className="text-center mb-8 border-b-2 border-black pb-4">
                <h2 className="text-xl font-bold mb-1">{schoolInfo.nama}</h2>
                <p className="text-xs text-gray-600 mb-1">NPSN: {schoolInfo.npsn}</p>
                <p className="text-xs text-gray-600 mb-1">{schoolInfo.alamat}</p>
                <p className="text-xs text-gray-600">Telepon: {schoolInfo.telepon} | Email: {schoolInfo.email}</p>
              </div>

              {/* Title */}
              <div className="text-center mb-6">
                <h3 className="text-lg font-bold mb-2">LAPORAN HASIL BELAJAR SISWA</h3>
                <p className="text-sm font-semibold">RAPOR SEMESTER {parseInt(selectedSemester) % 2 === 1 ? 'GANJIL' : 'GENAP'}</p>
                <p className="text-sm">Tahun Pelajaran 2023/2024</p>
              </div>

              {/* Identitas Siswa */}
              <div className="mb-6 grid grid-cols-2 gap-6 text-sm">
                <div>
                  <p className="mb-2"><span className="font-semibold">Nama Siswa</span> : {student?.nama}</p>
                  <p className="mb-2"><span className="font-semibold">No. Induk</span> : {student?.noDaftar}</p>
                  <p className="mb-2"><span className="font-semibold">Tempat, Tanggal Lahir</span> : {student?.email}</p>
                </div>
                <div>
                  <p className="mb-2"><span className="font-semibold">Kelas</span> : {student?.kelas}</p>
                  <p className="mb-2"><span className="font-semibold">Jurusan</span> : {student?.jurusan}</p>
                  <p className="mb-2"><span className="font-semibold">Tahun Ajaran</span> : 2023/2024</p>
                </div>
              </div>

              {/* Tabel Nilai */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-sm">HASIL PENILAIAN SEMESTER {parseInt(selectedSemester)}</h4>
                <table className="w-full border border-black text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-black p-2 w-8 text-center font-semibold">No</th>
                      <th className="border border-black p-2 font-semibold">Mata Pelajaran</th>
                      <th className="border border-black p-2 w-20 text-center font-semibold">Pengetahuan</th>
                      <th className="border border-black p-2 w-20 text-center font-semibold">Keterampilan</th>
                      <th className="border border-black p-2 w-16 text-center font-semibold">Nilai Akhir</th>
                      <th className="border border-black p-2 w-12 text-center font-semibold">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleGrades.map((grade, idx) => (
                      <tr key={grade.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border border-black p-2 text-center">{idx + 1}</td>
                        <td className="border border-black p-2">{grade.nama}</td>
                        <td className="border border-black p-2 text-center">{grade.pengetahuan}</td>
                        <td className="border border-black p-2 text-center">{grade.keterampilan}</td>
                        <td className="border border-black p-2 text-center font-semibold">{grade.nilaiAkhir}</td>
                        <td className="border border-black p-2 text-center font-bold">{grade.predikat}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Ringkasan */}
              <div className="mb-6 grid grid-cols-3 gap-4 text-sm">
                <div className="border border-gray-400 p-3">
                  <p className="text-center"><span className="font-semibold">Nilai Rata-rata</span></p>
                  <p className="text-center text-2xl font-bold">{rataRata}</p>
                </div>
                <div className="border border-gray-400 p-3">
                  <p className="text-center"><span className="font-semibold">Predikat Rata-rata</span></p>
                  <p className="text-center text-2xl font-bold">{getPredikat(rataRata)}</p>
                </div>
                <div className="border border-gray-400 p-3">
                  <p className="text-center"><span className="font-semibold">Total Mata Pelajaran</span></p>
                  <p className="text-center text-2xl font-bold">{sampleGrades.length}</p>
                </div>
              </div>

              {/* Catatan */}
              <div className="mb-6 border border-gray-400 p-3 text-sm">
                <p className="font-semibold mb-2">CATATAN DEWAN GURU:</p>
                <p className="text-gray-700 italic">
                  {rataRata >= 85 
                    ? "Siswa menunjukkan prestasi yang baik. Terus tingkatkan semangat belajar dan disiplin."
                    : rataRata >= 75
                    ? "Siswa perlu meningkatkan pemahaman pada beberapa mata pelajaran. Manfaatkan program remedial."
                    : "Siswa perlu bimbingan intensif. Segera hubungi orang tua/wali untuk konsultasi lebih lanjut."}
                </p>
              </div>

              {/* Tanda Tangan */}
              <div className="grid grid-cols-3 gap-8 text-center text-sm mt-12">
                <div>
                  <p className="font-semibold mb-2">Guru Pengajar,</p>
                  <div className="mx-auto h-10 mb-2 border-b w-40" />
                  <p className="text-xs font-semibold">{teachers[0]?.nama || 'Drs. BAMBANG SUPRIYADI, M.Pd.'}</p>
                  <p className="text-xs">NIP. {teachers[0]?.nip || '198501152010011001'}</p>
                </div>
                <div>
                  <p className="font-semibold mb-2">Wali Kelas,</p>
                  <div className="mx-auto h-10 mb-2 border-b w-40" />
                  <p className="text-xs font-semibold">{teachers[1]?.nama || 'SRI WAHYUNI, S.Pd.'}</p>
                  <p className="text-xs">NIP. {teachers[1]?.nip || '198708232011012002'}</p>
                </div>
                <div>
                  <p className="font-semibold mb-2">Kepala Sekolah,</p>
                  <div className="mx-auto h-10 mb-2 border-b w-40" />
                  <p className="text-xs font-semibold">{schoolInfo.kepalaSekolah}</p>
                  <p className="text-xs">NIP. 196503101995121001</p>
                </div>
              </div>

              <div className="mt-4 text-center text-xs text-gray-500">
                <p>Dicetak pada: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            </div>
          </div>

          {/* Card untuk tampilan non-print */}
          <Card className="no-print">
            <CardHeader>
              <CardTitle>Riwayat Semester</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Klik pada semester untuk melihat raport lengkap. Anda dapat melihat raport untuk setiap semester yang telah ditempuh.</p>
              <div className="grid grid-cols-3 gap-4">
                <button 
                  onClick={() => setSelectedSemester('1')}
                  className={`border rounded p-4 text-center cursor-pointer transition-all hover:shadow-lg hover:scale-105 ${
                    selectedSemester === '1' ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
                  }`}
                >
                  <p className="font-semibold">Semester 1</p>
                  <p className="text-2xl font-bold text-blue-600 mt-2">85</p>
                  <p className="text-xs text-muted-foreground mt-2">Rata-rata Nilai</p>
                </button>
                <button 
                  onClick={() => setSelectedSemester('2')}
                  className={`border rounded p-4 text-center cursor-pointer transition-all hover:shadow-lg hover:scale-105 ${
                    selectedSemester === '2' ? 'border-green-600 bg-green-50' : 'border-gray-300'
                  }`}
                >
                  <p className="font-semibold">Semester 2</p>
                  <p className="text-2xl font-bold text-green-600 mt-2">87</p>
                  <p className="text-xs text-muted-foreground mt-2">Rata-rata Nilai</p>
                </button>
                <button 
                  onClick={() => setSelectedSemester('3')}
                  className={`border rounded p-4 text-center cursor-pointer transition-all hover:shadow-lg hover:scale-105 ${
                    selectedSemester === '3' ? 'border-purple-600 bg-purple-50' : 'border-gray-300'
                  }`}
                >
                  <p className="font-semibold">Semester 3</p>
                  <p className="text-2xl font-bold text-purple-600 mt-2">{rataRata}</p>
                  <p className="text-xs text-muted-foreground mt-2">Rata-rata Nilai</p>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeMenu === 'profile' && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Profil Saya</h2>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary">
                    {student?.nama.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">{student?.nama}</h3>
                  <p className="text-muted-foreground">{student?.email}</p>
                  <Badge className="mt-2">{student?.jurusan}</Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">No. Daftar</p>
                  <p className="font-semibold">{student?.noDaftar}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Kelas</p>
                  <p className="font-semibold">{student?.kelas}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Tahun Masuk</p>
                  <p className="font-semibold">{student?.tahunMasuk}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Jurusan</p>
                  <p className="font-semibold">{student?.jurusan}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
};

export default StudentDashboard;
