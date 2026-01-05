import { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { FileText, BookOpen, Award, Download, Printer } from 'lucide-react';
import { Student } from '@/data/students';
import { getSubjectsByJurusan } from '@/data/subjects';
import { currentSemester, schoolInfo, getPredikat } from '@/data/grades';

type ActiveMenu = 'overview' | 'raport' | 'profile';

const StudentDashboard = () => {
  const { user } = useAuth();
  const student = user?.data as Student;
  const [activeMenu, setActiveMenu] = useState<ActiveMenu>('overview');

  const subjects = getSubjectsByJurusan(student?.jurusan || '');

  // Generate sample grades
  const sampleGrades = subjects.map((subject) => {
    const p = Math.floor(Math.random() * 15) + 80;
    const k = Math.floor(Math.random() * 15) + 80;
    const avg = Math.round((p + k) / 2);
    return {
      ...subject,
      pengetahuan: p,
      keterampilan: k,
      nilaiAkhir: avg,
      predikat: getPredikat(avg),
    };
  });

  const rataRata = Math.round(sampleGrades.reduce((a, b) => a + b.nilaiAkhir, 0) / sampleGrades.length);

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
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {activeMenu === 'raport' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Raport Semester {currentSemester}</h2>
              <p className="text-muted-foreground">Tahun Ajaran 2023/2024</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Printer className="w-4 h-4 mr-2" />
                Cetak
              </Button>
              <Button>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader className="border-b">
              <div className="text-center">
                <h3 className="text-lg font-bold">{schoolInfo.nama}</h3>
                <p className="text-sm text-muted-foreground">{schoolInfo.alamat}</p>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div>
                  <p><strong>Nama:</strong> {student?.nama}</p>
                  <p><strong>No. Daftar:</strong> {student?.noDaftar}</p>
                </div>
                <div>
                  <p><strong>Kelas:</strong> {student?.kelas}</p>
                  <p><strong>Semester:</strong> {currentSemester} (Ganjil)</p>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">No</TableHead>
                    <TableHead>Mata Pelajaran</TableHead>
                    <TableHead className="w-24 text-center">Pengetahuan</TableHead>
                    <TableHead className="w-24 text-center">Keterampilan</TableHead>
                    <TableHead className="w-20 text-center">Nilai</TableHead>
                    <TableHead className="w-20 text-center">Predikat</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleGrades.map((grade, idx) => (
                    <TableRow key={grade.id}>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>{grade.nama}</TableCell>
                      <TableCell className="text-center">{grade.pengetahuan}</TableCell>
                      <TableCell className="text-center">{grade.keterampilan}</TableCell>
                      <TableCell className="text-center font-bold">{grade.nilaiAkhir}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant={grade.predikat === 'A' ? 'default' : 'secondary'}>
                          {grade.predikat}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <p className="font-semibold">Rata-rata Nilai: {rataRata}</p>
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
