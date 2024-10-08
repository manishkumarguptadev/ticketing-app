import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="grid gap-4 md:grid-cols-3 md:gap-8">
      <div className="flex flex-col gap-4 md:col-span-2 md:gap-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          <Card className="min-h-28"></Card>
          <Card className="min-h-28"></Card>
          <Card className="min-h-28"></Card>
        </div>
        <Card className="min-h-96"></Card>
      </div>
      <Card className="min-h-96"></Card>
    </div>
  );
}
