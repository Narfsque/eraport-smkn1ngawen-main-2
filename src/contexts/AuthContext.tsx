import React, { createContext, useContext, useState, ReactNode } from 'react';
import { allStudents, Student } from '@/data/students';
import { teachers, Teacher } from '@/data/teachers';

type UserRole = 'admin' | 'guru' | 'siswa' | null;

interface AuthUser {
  id: string;
  nama: string;
  email: string;
  role: UserRole;
  data: Student | Teacher | null;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => { success: boolean; message: string };
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Admin account
const adminAccount = {
  email: "admin@smkn1ngawen.sch.id",
  password: "admin123",
  nama: "Administrator",
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = (email: string, password: string): { success: boolean; message: string } => {
    // Check admin
    if (email === adminAccount.email && password === adminAccount.password) {
      setUser({
        id: "ADMIN",
        nama: adminAccount.nama,
        email: adminAccount.email,
        role: 'admin',
        data: null,
      });
      return { success: true, message: "Login berhasil!" };
    }

    // Check teachers
    const teacher = teachers.find(t => t.email === email && t.password === password);
    if (teacher) {
      setUser({
        id: teacher.id,
        nama: teacher.nama,
        email: teacher.email,
        role: 'guru',
        data: teacher,
      });
      return { success: true, message: "Login berhasil!" };
    }

    // Check students
    const student = allStudents.find(s => s.email === email && s.password === password);
    if (student) {
      setUser({
        id: student.id,
        nama: student.nama,
        email: student.email,
        role: 'siswa',
        data: student,
      });
      return { success: true, message: "Login berhasil!" };
    }

    return { success: false, message: "Email atau password salah!" };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
