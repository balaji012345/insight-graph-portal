import shield from "@/assets/ncrb-shield.png";

export function Emblem() {
  return (
    <div className="flex flex-col items-center text-center">
      <img
        src={shield}
        alt="National Crime Records Bureau departmental shield emblem"
        width={816}
        height={816}
        className="h-20 w-20 drop-shadow-[0_10px_30px_oklch(0.79_0.13_84_/_0.35)] sm:h-24 sm:w-24"
      />
      <div className="mt-4 h-px w-24 rule-gold" />
      <h1 className="mt-4 text-balance text-xl font-bold uppercase tracking-wide sm:text-2xl">
        AI-Powered Criminal Network Analysis System
      </h1>
      <p className="mt-2 text-sm font-medium tracking-[0.18em] text-gold uppercase">
        National Crime Records Bureau
      </p>
      <p className="mt-1 text-xs text-muted-foreground">Ministry of Home Affairs, Government of India</p>
    </div>
  );
}
