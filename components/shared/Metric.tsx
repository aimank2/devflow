import Image from "next/image";
import Link from "next/link";
import React from "react";

interface MetricProps {
  imgUrl: string;
  alt: string;
  value: string | number;
  title: string;
  textStyles: string;
  href?: string;
  isAuthor?: boolean;
}

const Metric: React.FC<MetricProps> = ({
  imgUrl,
  alt,
  value,
  title,
  textStyles,
  href,
  isAuthor,
}) => {
  const metricContent = (
    <>
      <Image
        src={imgUrl}
        alt={alt}
        width={16}
        height={16}
        className={`object-contain ${href ? "rounded-full" : ""}`}
      />{" "}
      <p className={`${textStyles} flex items-center gap-1`}>
        {value}{" "}
        <span
          className={` smal-regular line-clamp-1 ${isAuthor ? "max-sm:hidden" : ""}`}
        ></span>{" "}
        {title}
      </p>
    </>
  );
  if (href) {
    return (
      <Link href={href} className="flex-center flex-wrap gap-1">
        {metricContent}
      </Link>
    );
  }
  return <div className="flex-center flex-wrap gap-1">{metricContent}</div>;
};

export default Metric;
