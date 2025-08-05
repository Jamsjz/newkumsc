import { BookOpen, Users, GraduationCap } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ClubFeatures = () => {
  const features = [
    {
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      title: "Academic Growth",
      description:
        "Engage in activities designed to foster academic excellence and deepen your understanding of mathematics.",
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Networking Hub",
      description:
        "Connect with peers, alumni, and professionals in the field of computational mathematics and beyond.",
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-primary" />,
      title: "Mentorship",
      description:
        "Gain valuable insights and guidance from experienced researchers and industry experts through our programs.",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {features.map((feature) => (
        <Card key={feature.title}>
          <CardHeader>
            {feature.icon}
            <CardTitle className="mt-4">{feature.title}</CardTitle>
            <CardDescription>{feature.description}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default ClubFeatures;
