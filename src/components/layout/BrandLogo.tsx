import actsLogo from "../../assets/Logo Acts.png";

interface BrandLogoProps {
  className?: string;
  alt?: string;
}

export function BrandLogo({
  className = "h-12 w-12",
  alt = "ACTS logo",
}: BrandLogoProps) {
  return <img src={actsLogo} alt={alt} className={className} />;
}
