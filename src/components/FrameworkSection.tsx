import type { Framework } from "@/lib/types";
import { CatalogEntry } from "./CatalogEntry";
import { RankingBoard } from "./charts/RankingBoard";
import { ScaleRuler } from "./charts/ScaleRuler";
import { ForcedChoiceBuckets } from "./charts/ForcedChoiceBuckets";
import { QuadrantPlot } from "./charts/QuadrantPlot";
import { TimeAllocationBars } from "./charts/TimeAllocationBars";
import { NominationLineup } from "./charts/NominationLineup";

export function FrameworkSection({ framework }: { framework: Framework }) {
  return (
    <CatalogEntry
      number={framework.number}
      title={framework.title}
      prompt={framework.prompt}
      note={framework.note}
    >
      {framework.type === "ranking" && <RankingBoard framework={framework} />}
      {framework.type === "scale" && <ScaleRuler framework={framework} />}
      {framework.type === "forcedChoice" && <ForcedChoiceBuckets framework={framework} />}
      {framework.type === "quadrant" && <QuadrantPlot framework={framework} />}
      {framework.type === "timeAllocation" && <TimeAllocationBars framework={framework} />}
      {framework.type === "nomination" && <NominationLineup framework={framework} />}
    </CatalogEntry>
  );
}
