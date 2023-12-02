import { ErrorType } from '@/types/network';

interface Props {
  error: ErrorType;
}

export default function ErrorBoundary({ error }: Props) {
  return (
    <div
      className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'
      role='alert'>
      <strong className='font-bold'>Oops! Something went wrong.</strong>
      <span className='block sm:inline'> Please try again later.</span>
      <div>
        <p>Status : {error?.response?.status}</p>
        <p>Message : {error?.response?.statusText}</p>
      </div>
    </div>
  );
}
