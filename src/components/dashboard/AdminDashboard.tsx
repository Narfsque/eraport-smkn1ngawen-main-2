import { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, GraduationCap, BookOpen, FileText, Upload, Search, UserPlus, Settings } from 'lucide-react';
import { allStudents } from '@/data/students';
import { teachers } from '@/data/teachers';
import { allSubjects } from '@/data/subjects';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

type ActiveMenu = 'overview' | 'students' | 'teachers' | 'subjects' | 'import';

const AdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState<ActiveMenu>('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const stats = [
    { title: 'Total Siswa', value: allStudents.length, icon: Users, color: 'text-blue-500' },
    { title: 'Total Guru', value: teachers.length, icon: GraduationCap, color: 'text-green-500' },
    { title: 'Mata Pelajaran', value: allSubjects.length, icon: BookOpen, color: 'text-purple-500' },
    { title: 'Total Kelas', value: 12, icon: FileText, color: 'text-orange-500' },
  ];

  const filteredStudents = allStudents.filter(s => 
    s.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.kelas.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTeachers = teachers.filter(t =>
    t.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.mataPelajaran.some(m => m.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleImport = () => {
    toast.info('Fitur import sedang dalam pengembangan. Silakan upload file PDF/Excel.');
  };

  const sidebar = (
    <nav className="space-y-1">
      {[
        { id: 'overview', label: 'Ringkasan', icon: Settings },
        { id: 'students', label: 'Data Siswa', icon: Users },
        { id: 'teachers', label: 'Data Guru', icon: GraduationCap },
        { id: 'subjects', label: 'Mata Pelajaran', icon: BookOpen },
        { id: 'import', label: 'Import Data', icon: Upload },
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
    <DashboardLayout title="Dashboard Admin" sidebar={sidebar}>
      {activeMenu === 'overview' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Selamat Datang, Administrator</h2>
            <p className="text-muted-foreground">Kelola data siswa, guru, dan raport sekolah</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                    <stat.icon className={`w-10 h-10 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Aksi Cepat</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button onClick={() => setActiveMenu('students')}>
                <UserPlus className="w-4 h-4 mr-2" />
                Tambah Siswa
              </Button>
              <Button variant="outline" onClick={() => setActiveMenu('teachers')}>
                <GraduationCap className="w-4 h-4 mr-2" />
                Kelola Guru
              </Button>
              <Button variant="outline" onClick={() => setActiveMenu('import')}>
                <Upload className="w-4 h-4 mr-2" />
                Import Data
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {activeMenu === 'students' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Data Siswa</h2>
              <p className="text-muted-foreground">Total: {allStudents.length} siswa</p>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari siswa..."
                  className="pl-10 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button>
                <UserPlus className="w-4 h-4 mr-2" />
                Tambah
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>No</TableHead>
                      <TableHead>Nama</TableHead>
                      <TableHead>Kelas</TableHead>
                      <TableHead>Jurusan</TableHead>
                      <TableHead>Email</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.slice(0, 20).map((student, idx) => (
                      <TableRow key={student.id}>
                        <TableCell>{idx + 1}</TableCell>
                        <TableCell className="font-medium">{student.nama}</TableCell>
                        <TableCell>{student.kelas}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{student.jurusan}</Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">{student.email}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeMenu === 'teachers' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Data Guru</h2>
              <p className="text-muted-foreground">Total: {teachers.length} guru</p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari guru..."
                className="pl-10 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTeachers.map((teacher) => (
              <Card key={teacher.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{teacher.nama}</h3>
                      <p className="text-sm text-muted-foreground">{teacher.nip}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {teacher.mataPelajaran.map((mapel) => (
                          <Badge key={mapel} variant="outline" className="text-xs">
                            {mapel}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeMenu === 'subjects' && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Mata Pelajaran</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allSubjects.map((subject) => (
              <Card key={subject.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge variant={subject.kategori === 'Umum' ? 'default' : 'secondary'} className="mb-2">
                        {subject.kategori}
                      </Badge>
                      <h3 className="font-semibold">{subject.nama}</h3>
                      <p className="text-sm text-muted-foreground">Kode: {subject.kode}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">KKM: {subject.kkm}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeMenu === 'import' && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Import Data</h2>
          <Card>
            <CardHeader>
              <CardTitle>Upload File</CardTitle>
              <CardDescription>
                Import data siswa atau guru dari file PDF/Excel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">
                  Drag & drop file PDF atau Excel di sini, atau
                </p>
                <Button onClick={handleImport}>Pilih File</Button>
                <p className="text-xs text-muted-foreground mt-4">
                  Format yang didukung: PDF, XLSX, XLS, CSV
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminDashboard;
