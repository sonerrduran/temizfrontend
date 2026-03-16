export function navigateByRole(role: string, navigate: (path: string) => void) {
  switch (role) {
    case 'SUPER_ADMIN':
      navigate('/admin');
      break;
    case 'SCHOOL_ADMIN':
      navigate('/admin');
      break;
    case 'TEACHER':
      navigate('/teacher');
      break;
    case 'PARENT':
      navigate('/parent');
      break;
    default:
      navigate('/dashboard');
      break;
  }
}
