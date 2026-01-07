import { Student } from '@/data/students';

// Return a new array where each student has an explicit `subkelas` (A, B, C...)
// If a student already has `subkelas`, it is preserved. Otherwise we compute
// subkelas by ordering students within the same `kelas` by `nama` and splitting
// into groups of `rombelSize`.
export function enrichStudentsWithSubkelas(students: Student[], rombelSize = 30) {
  // clone array to avoid mutating original
  const cloned = students.map(s => ({ ...s }));
  const kelasGroups: Record<string, Student[]> = {};

  cloned.forEach(s => {
    if (!kelasGroups[s.kelas]) kelasGroups[s.kelas] = [];
    kelasGroups[s.kelas].push(s);
  });

  Object.keys(kelasGroups).forEach(kelas => {
    const list = kelasGroups[kelas];
    // preserve existing subkelas when present; we still want deterministic order
    list.sort((a, b) => a.nama.localeCompare(b.nama));
    for (let i = 0; i < list.length; i++) {
      const student = list[i];
      if (student.subkelas && student.subkelas.trim() !== '') continue; // keep explicit value
      const groupIndex = Math.floor(i / rombelSize);
      student.subkelas = String.fromCharCode(65 + groupIndex); // A, B, C...
    }
  });

  return cloned;
}

// Numbered subkelas: assign numeric subkelas (1,2,3...) to students within the same `kelas`.
// Preserves an existing `subkelas` if already set (and numeric); otherwise assigns numbers
// based on alphabetical order of `nama`. `maxPerClass` controls the maximum students per group.
export function enrichStudentsWithNumberedSubkelas(students: Student[], maxPerClass = 36) {
  const cloned = students.map(s => ({ ...s }));
  const kelasGroups: Record<string, Student[]> = {};

  cloned.forEach(s => {
    if (!kelasGroups[s.kelas]) kelasGroups[s.kelas] = [];
    kelasGroups[s.kelas].push(s);
  });

  Object.keys(kelasGroups).forEach(kelas => {
    const list = kelasGroups[kelas];
    list.sort((a, b) => a.nama.localeCompare(b.nama));
    for (let i = 0; i < list.length; i++) {
      const student = list[i];
      // if subkelas already a numeric string, keep it
      if (student.subkelas && /^[0-9]+$/.test(student.subkelas)) continue;
      const groupIndex = Math.floor(i / maxPerClass);
      student.subkelas = String(groupIndex + 1); // 1-based
    }
  });

  return cloned;
}

// Assign students into provided class templates (exact labels) ensuring a maximum
// of `maxPerClass` students per template. Templates should be full labels like
// "XI TKR A" or "X TB B". The function matches students by their existing
// `kelas` (e.g., "XI TKR") and `jurusan`, then distributes them across the
// matching templates in alphabetical order.
export function assignStudentsToTemplates(students: Student[], templates: string[], maxPerClass = 36) {
  const cloned = students.map(s => ({ ...s }));

  // Group templates by baseKey (grade + jurusan), e.g., "XI TKR" -> ["XI TKR A", ...]
  const templateGroups: Record<string, string[]> = {};
  templates.forEach(t => {
    const parts = t.split(' ');
    if (parts.length < 2) return;
    const baseKey = parts.slice(0, 2).join(' ');
    if (!templateGroups[baseKey]) templateGroups[baseKey] = [];
    templateGroups[baseKey].push(t);
  });

  // Prepare buckets of students by baseKey derived from their current `kelas` value
  const studentBuckets: Record<string, Student[]> = {};
  cloned.forEach(s => {
    // assume s.kelas is like "XI TKR" or "XI DPIB" already
    const parts = s.kelas.split(' ');
    const baseKey = parts.slice(0, 2).join(' ');
    if (!studentBuckets[baseKey]) studentBuckets[baseKey] = [];
    studentBuckets[baseKey].push(s);
  });

  // For each baseKey, sort students and distribute into templates
  Object.keys(studentBuckets).forEach(baseKey => {
    const list = studentBuckets[baseKey].sort((a, b) => a.nama.localeCompare(b.nama));
    const groupTemplates = templateGroups[baseKey] ?? [baseKey];
    // ensure deterministic order of templates
    groupTemplates.sort();
    let tplIndex = 0;
    let countInCurrent = 0;
    for (let i = 0; i < list.length; i++) {
      const student = list[i];
      const tpl = groupTemplates[tplIndex] ?? baseKey;
      // extract section token as last part of tpl if present
      const tplParts = tpl.split(' ');
      const section = tplParts.length > 2 ? tplParts.slice(2).join(' ') : '1';
      student.kelas = tplParts.slice(0, 2).join(' ');
      student.subkelas = section;
      countInCurrent++;
      if (countInCurrent >= maxPerClass) {
        tplIndex++;
        countInCurrent = 0;
      }
    }
  });

  // For any templates that have no students, nothing to change; return cloned list
  return cloned;
}
