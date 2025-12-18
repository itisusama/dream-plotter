import MainHeading from "@/components/shared/main-heading";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/useUserStore";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Landing() {
  const { user } = useUserStore();
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <MainHeading
        title="Fin Tracker - Your Personal Finance Manager"
        data-aos="fade-down"
      />
      <p className="text-center my-4" data-aos="fade-up">
        Hi! There. Do you have issues in managing you personal finance?
        <br />
        No worries now. With <b>Fin Tracker</b>, you can manage your finance
        easily and effectively.
      </p>

      {user ? (
        <>
          <Link to="/dashboard">
            <Button variant="secondary" data-aos="fade-down">
              Get to Dashboard
              <ArrowRight />
            </Button>
          </Link>
        </>
      ) : (
        <>
          <Link to="/login">
            <Button variant="secondary" data-aos="fade-down">
              Get Started
              <ArrowRight />
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}
