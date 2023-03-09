import { type UserStatus } from "@prisma/client";

export const GetStatus = ({ status }: { status: UserStatus }) => {
  switch (status) {
    case "Pending":
      return <div className="badge-ghost badge">NEU</div>;
    case "Contacted":
      return <div className="badge-info badge">Kontaktiert</div>;
    case "Lectured":
      return <div className="badge-warning badge">Vortrag besucht</div>;
    case "Trained":
      return <div className="badge-success badge">Training absolviert</div>;
    case "Rejected":
      return <div className="badge-error badge">Rejected</div>;
    default:
      return <div className="badge-error badge">Blockiert</div>;
  }
};
