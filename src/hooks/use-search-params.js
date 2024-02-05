import { useLocation } from 'react-router-dom';
export default function useParseSearchParams() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  return searchParams;
}
