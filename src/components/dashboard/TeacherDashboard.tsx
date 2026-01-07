import { useState, useRef } from 'react';
import DashboardLayout from './DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Users, BookOpen, FileText, Save, PenLine, FolderOpen, Download, Printer } from 'lucide-react';
import { Teacher } from '@/data/teachers';
import { allStudents } from '@/data/students';
import { currentSemester } from '@/data/grades';
import { toast } from 'sonner';
import { generatePDF, printElement } from '@/lib/pdf-utils';

type ActiveMenu = 'overview' | 'input-nilai' | 'students' | 'materials';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const teacher = user?.data as Teacher;
  const [activeMenu, setActiveMenu] = useState<ActiveMenu>('overview');
  const [selectedKelas, setSelectedKelas] = useState<string>('');
  const [grades, setGrades] = useState<Record<string, { pengetahuan: string; keterampilan: string }>>({});
  const gradesTableRef = useRef<HTMLDivElement>(null);
  const studentTableRef = useRef<HTMLDivElement>(null);

  const kelasOptions = teacher?.kelasAjar || [];
  const studentsInClass = allStudents.filter(s => s.kelas === selectedKelas);

  const handleGradeChange = (studentId: string, type: 'pengetahuan' | 'keterampilan', value: string) => {
    setGrades(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [type]: value
      }
    }));
  };

  const handleSaveGrades = () => {
    toast.success('Nilai berhasil disimpan!');
  };

  const sidebar = (
    <nav className="space-y-1">
      {[
        { id: 'overview', label: 'Ringkasan', icon: FileText },
        { id: 'input-nilai', label: 'Input Nilai', icon: PenLine },
        { id: 'students', label: 'Data Siswa', icon: Users },
        { id: 'materials', label: 'Materi', icon: FolderOpen },
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
    <DashboardLayout title="Dashboard Guru" sidebar={sidebar}>
      {activeMenu === 'overview' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Selamat Datang, {teacher?.nama}</h2>
            <p className="text-muted-foreground">Semester {currentSemester} - Tahun Ajaran 2023/2024</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <BookOpen className="w-10 h-10 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Mata Pelajaran</p>
                    <p className="text-2xl font-bold">{teacher?.mataPelajaran.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Users className="w-10 h-10 text-green-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Kelas Ajar</p>
                    <p className="text-2xl font-bold">{teacher?.kelasAjar.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <FileText className="w-10 h-10 text-orange-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Jurusan</p>
                    <p className="text-2xl font-bold">{teacher?.jurusan.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Mata Pelajaran yang Diampu</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {teacher?.mataPelajaran.map((mapel) => (
                  <Badge key={mapel} variant="secondary" className="text-sm py-1 px-3">
                    {mapel}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeMenu === 'input-nilai' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Input Nilai Semester {currentSemester}</h2>
              <p className="text-muted-foreground">Pilih kelas untuk menginput nilai</p>
            </div>
            <div className="flex gap-2 items-center">
              <Select value={selectedKelas} onValueChange={setSelectedKelas}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Pilih Kelas" />
                </SelectTrigger>
                <SelectContent>
                  {kelasOptions.map((kelas) => (
                    <SelectItem key={kelas} value={kelas}>{kelas}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedKelas && (
                <>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      if (gradesTableRef.current) {
                        printElement(gradesTableRef.current);
                      }
                    }}
                  >
                    <Printer className="w-4 h-4 mr-2" />
                    Cetak
                  </Button>
                  <Button 
                    onClick={() => {
                      if (gradesTableRef.current) {
                        generatePDF(gradesTableRef.current, `Nilai_${selectedKelas}_${new Date().toLocaleDateString()}.pdf`);
                        toast.success('PDF berhasil diunduh!');
                      }
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </>
              )}
            </div>
          </div>

          {selectedKelas && studentsInClass.length > 0 && (
            <div ref={gradesTableRef}>
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">No</TableHead>
                        <TableHead>Nama Siswa</TableHead>
                        <TableHead className="w-32">Pengetahuan</TableHead>
                        <TableHead className="w-32">Keterampilan</TableHead>
                        <TableHead className="w-24">Rata-rata</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {studentsInClass.map((student, idx) => {
                        const p = parseInt(grades[student.id]?.pengetahuan || '0');
                        const k = parseInt(grades[student.id]?.keterampilan || '0');
                        const avg = p && k ? Math.round((p + k) / 2) : '-';
                        return (
                          <TableRow key={student.id}>
                            <TableCell>{idx + 1}</TableCell>
                            <TableCell className="font-medium">{student.nama}</TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                min="0"
                                max="100"
                                placeholder="0-100"
                                value={grades[student.id]?.pengetahuan || ''}
                                onChange={(e) => handleGradeChange(student.id, 'pengetahuan', e.target.value)}
                                className="w-24"
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                min="0"
                                max="100"
                                placeholder="0-100"
                                value={grades[student.id]?.keterampilan || ''}
                                onChange={(e) => handleGradeChange(student.id, 'keterampilan', e.target.value)}
                                className="w-24"
                              />
                            </TableCell>
                            <TableCell>
                              <Badge variant={typeof avg === 'number' && avg >= 75 ? 'default' : 'secondary'}>
                                {avg}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
                <div className="p-4 border-t flex justify-end">
                  <Button onClick={handleSaveGrades}>
                    <Save className="w-4 h-4 mr-2" />
                    Simpan Nilai
                  </Button>
                </div>
              </CardContent>
            </Card>
            </div>
          )}

          {selectedKelas && studentsInClass.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                Tidak ada siswa di kelas ini
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {activeMenu === 'students' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Data Siswa</h2>
            </div>
            <div className="flex gap-2">
              <Select value={selectedKelas} onValueChange={setSelectedKelas}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Pilih Kelas" />
                </SelectTrigger>
                <SelectContent>
                  {kelasOptions.map((kelas) => (
                    <SelectItem key={kelas} value={kelas}>{kelas}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedKelas && (
                <>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      if (studentTableRef.current) {
                        printElement(studentTableRef.current);
                      }
                    }}
                  >
                    <Printer className="w-4 h-4 mr-2" />
                    Cetak
                  </Button>
                  <Button 
                    onClick={() => {
                      if (studentTableRef.current) {
                        generatePDF(studentTableRef.current, `Data_Siswa_${selectedKelas}_${new Date().toLocaleDateString()}.pdf`);
                        toast.success('PDF berhasil diunduh!');
                      }
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </>
              )}
            </div>
          </div>

          {selectedKelas && (
            <div ref={studentTableRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {studentsInClass.map((student) => (
                <Card key={student.id}>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{student.nama}</h3>
                    <p className="text-sm text-muted-foreground">{student.noDaftar}</p>
                    <Badge variant="outline" className="mt-2">{student.kelas}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {activeMenu === 'materials' && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Materi Pembelajaran</h2>
          <Card>
            <CardContent className="p-8 text-center">
              <FolderOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">Upload dan kelola materi pembelajaran Anda</p>
              <Button>Upload Materi</Button>
            </CardContent>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
};

export default TeacherDashboard;
