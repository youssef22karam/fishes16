# IchthyoMorph v15 — hyper-realistic procedural fish generator

React + Vite + Tailwind + Three.js. 106 species, each lofted from morphometrics measured on the
reference photographs of the [fish-images](https://github.com/youssef22karam/fish-images) library
(the app loads those photos directly from the library via jsDelivr for side-by-side comparison).

## What changed in v15 — eyes and gills rebuilt as organs
**Eyes (`engine/eyes.ts`, eye stages of `engine/shader.ts`)**
- A real globe that *turns in its socket* (vertex shader rotation about the globe centre, per-eye uniforms):
  spherical where exposed, oblate behind the lids. Lens dome standing in the pupil, recessed iris dish,
  limbus, clear corneal bulge → depth, parallax and separate highlights from every angle.
- Protrusion is a species character (`eyeForm`): flush under the skin (tunas, sharks) · low dome (most fishes) ·
  half-ball (gobies, blennies, flatfishes, frogfishes, seahorses, puffers) · periscope turrets looking sideways
  (mudskipper, stingrays). The globe curvature also adapts to the measured curvature of the skull at the orbit,
  so big-eyed small fishes get domed eyes instead of goggles.
- Orbit = head skin shrink-wrapped from the lid margin over the ball down onto the skull (same texture and
  integument, welded normals, S-profile fillet, contact shadow).
- Iris is fish tissue, not a human iris: guanine argentea with tilted platelets, discrete melanophores crowded
  on the dorsal cap, bright pupillary margin, dark limbal ring. Pupils: round · pear (aphakic space of pursuit
  predators) · vertical slit (sharks) · horizontal oval (mudskipper, gobies, catfishes) · crescent with scalloped
  operculum pupillare (rays, flatfishes). Tapetum eyeshine (sharks, walleye, deep-sea fishes), adipose eyelid
  (herrings, mackerels, bonefish), iridescent cornea (gobies, flatfishes, puffers).
- Fixational drift + tremor on top of the saccades. New optional `EyeSpec` fields: `pupil`, `shine`, `adipose`.

**Gills (`engine/gills.ts`, `BodyModel.gills`)**
- The flank under every gill cover is recessed into a real gill chamber; the cover (operculum + opercular
  membrane) is a thin shell that continues the head skin exactly and ends in a free hind margin overlapping
  the shoulder girdle. The margin is a true crescent: nape → HL at mid flank → forward under the cheek to the isthmus.
- Inside: stacked gill arches (bony arch + rakers + combs of blood-red filaments with secondary lamellae),
  dark vascular lining, pale inner membrane. Breathing swings the cover out about its front hinge, the arches
  fan into the opening slit and light falls into the chamber; a strike flares everything.
- Opening types by taxon (`Species.gill.kind` overrides): `opercle` · `restricted` slit in front of the pectoral
  base (eels, gobies, mudskipper, puffers, triggerfish, cowfish, sunfish, ratfish) · `pore` (morays, seahorses,
  anglerfishes – in the pectoral axil) · `slits` (sharks: five pockets with moving septal flaps).
- The pectoral fin is seated on the shoulder girdle *behind* the opening (`BodyModel.pecStation`), shark slits
  end above the fin base → gill covers and side fins can never overlap.
- Stills: `?breath=0..1.5` holds the gill covers, `?gaze=yaw,pitch` holds the eyes, `?dir=x,y,z` free camera direction.

## What changed in v12
**Mouth fixes (wrasses, parrotfishes and every small-mouthed species)**
- Premaxillary protrusion, lip cushions and hyoid/throat depression now scale with the measured jaw
  (they were absolute: a 3 %-SL parrotfish mouth slid forward 78 % of its own length → needle snout).
- Protrusion fades to zero at the rictus → no more cheek slit behind the mouth corner.
- Lower-jaw skinning stops at the quadrate joint → throat skin no longer swings up into the head.
- Lower-lip tube winding fixed (it rendered inside-out → crumpled look).
- Parrotfish/puffer beaks are solid fused dental plates (species beak colour).

**Fins — part of the body, jointed, moving**
- Every fin is a closed two-layer shell: a fleshy root fillet that starts exactly on the body skin
  (and carries the body's own scale texture), bony rays raised on both faces, accordion pleats,
  translucent membrane with ray segmentation/branching, patterns (spots, leopard, bands, net, ray spots)
  and frayed margins.
- Caudal root continues the peduncle surface exactly; procurrent rays; new `delta` tail; corrected
  `rounded`/`halfmoon` outlines.
- 3D spines on spiny fins (+ perciform anal/pelvic spines), guppy gonopodium.
- Joints in the vertex shader: pectorals/pelvics row + feather from a ball joint at the fin base
  (labriform swimmers row hard), median fins ripple, the caudal cups/flexes and the body wave
  continues through long tails.

**Eyes** — gaze-driven globe (procedural iris fibres, pupillary ring, limbus, round pupil) under a clear
cornea, seated in a skin socket; saccades, independent left/right drift, convergence + pupil dilation
during the feeding strike.

## Layout (every file < 30 kB — no reassembly step needed)
- `src/engine/model.ts` analytic body model · `build.ts` body loft + orchestration
- `mouth.ts`, `eyes.ts`, `gills.ts`, `fins.ts`, `extras.ts` (rostra, barbels, spikes, fronds), `geom.ts`, `shader.ts`, `skin.ts`
- `src/data/species{1,2,3}{a,b}.ts` species data · `factory.ts` archetypes

URL parameters: `?sp=guppy&view=side|three|front|top|below&gape=0..1&feed=0|1&swim=0|1&fins=0|1&eyes=0|1&zoom=2&focus=0.9`.

```sh
npm install && npm run dev   # or npm run build
```
