import Link from "next/link";
import LineDivider from "@/components/line-divider";

interface ReviewSuccessProps {
  employeeId: number;
  generatedReview: string;
}

export default function ReviewSuccess({
  employeeId,
  generatedReview,
}: ReviewSuccessProps) {
  return (
    <>
      <div className="min-h-40 mt-10 rounded-md bg-[#121828] relative">
        <div className="p-4">
          <p>{generatedReview}</p>
        </div>
      </div>
      <div className="mt-4 gap-3 flex justify-end">
        <Link
          href="/employee"
          className="bg-[#776fff] mb-8 text-white px-4 py-2 rounded-md hover:bg-[#5a54cc] transition-colors"
        >
          Return to employee dashboard
        </Link>
        <Link
          href={`/employee/${employeeId}`}
          className="bg-[#ff4694] mb-8 text-white px-4 py-2 rounded-md hover:bg-[#d93a7c] transition-colors"
        >
          View Employee Profile
        </Link>
      </div>
    </>
  );
}
