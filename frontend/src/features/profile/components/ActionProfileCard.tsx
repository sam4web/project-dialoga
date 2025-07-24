import Button from "@/components/ui/Button";

function ActionProfileCard() {
  return (
    <div className="card section-card space-y-0 flex gap-4 flex-wrap sm:flex-nowrap">
      <Button variant="outline" className="w-full">
        Change Password
      </Button>
      <Button variant="danger" className="w-full">
        Sign out
      </Button>
    </div>
  );
}

export default ActionProfileCard;
