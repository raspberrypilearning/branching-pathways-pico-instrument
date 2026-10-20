# Pathway map

The [page-level flowchart](step-dependencies.mermaid) shows each learner page as a node. The **only required start** is `1A - Connect and test your Pico`. Open the starter and get the LED and Shell message working on a real Pico before using another page.

After that, choose pages in any order. These groups are a menu, not a sequence:

- **Make the body:** `2A` own idea, `2B` cut/fold/join, `2C` adapt an object, `2D` wrap/stitch/stuff. Mix methods.
- **Choose a sound maker:** `3A` active buzzer or `3B` passive buzzer. Use one on GP9 at a time.
- **Make some sounds:** `4A` beeps and rhythms, `4B` named notes, `4C` pitch slides. Named notes and slides need a passive buzzer.
- **Make your controls:** `5A` press, `5B` touch, `5C` dial, `5D` shadow, `5E` distance, `5F` tilt, `5G` line sensor, `5H` switch, `5I` temperature, `5J` temperature probe. Choose one or several.
- **Bring it together:** `6A` one control, `6B` two controls, `6C` repeated contacts. These are examples of ways to combine parts, not prescribed builds.
- **Play and change it:** `7A` is the finish when the learner has a playable instrument. They may go back and change anything.
- **Optional ideas to borrow:** `8A` Pico guitar, `8B` Pico violin, `8C` Pico drumkit, `8D` Pico theremin. Borrow a technique without copying the whole instrument.

Possible routes include `1A → 2A → 5A → 3B → 6A → 7A` (body first), `1A → 3B → 4B → 5C → 6A → 7A` (sound first), and `1A → 5A → 3A → 4A → 6A → 7A` (controls first). These are examples; learners can switch route at any point.

## Page-level flowchart

Every numbered learner page is a node. The central choice point means the learner can move between pages after testing the Pico. Dotted arrows show useful checks, not locked routes.

<!-- BEGIN GENERATED FLOWCHART -->
```mermaid
flowchart LR
    START([Open starter project]) --> P1A["1A Connect and test your Pico"]
    P1A --> PICK{Pick any page, in any order}

    subgraph BODY[Make the body]
      P2A["2A Follow your own idea"]
      P2B["2B Cut, fold and join"]
      P2C["2C Adapt something you have"]
      P2D["2D Wrap, stitch and stuff"]
    end
    subgraph BUZZER[Choose a sound maker]
      P3A["3A Active buzzer"]
      P3B["3B Passive buzzer"]
    end
    subgraph SOUND[Make some sounds]
      P4A["4A Beeps and rhythms"]
      P4B["4B Play named notes"]
      P4C["4C Slide between pitches"]
    end
    subgraph INPUT[Make your controls]
      P5A["5A Press or squeeze"]
      P5B["5B Touch a pad"]
      P5C["5C Turn a dial"]
      P5D["5D Play with shadows"]
      P5E["5E Play in the air"]
      P5F["5F Tip or rock it"]
      P5G["5G Pull a pattern through"]
      P5H["5H Flip a switch"]
      P5I["5I Play with warmth"]
      P5J["5J Explore warm and cool"]
    end
    subgraph COMBINE[Bring it together]
      P6A["6A Try one control"]
      P6B["6B Give two controls a job"]
      P6C["6C Put contacts wherever you want"]
    end
    P7A["7A Play and change it"]
    subgraph IDEAS[Optional ideas to borrow]
      P8A["8A Pico guitar idea"]
      P8B["8B Pico violin idea"]
      P8C["8C Pico drumkit idea"]
      P8D["8D Pico theremin idea"]
    end

    PICK <--> P2A
    PICK <--> P2B
    PICK <--> P2C
    PICK <--> P2D
    PICK <--> P3A
    PICK <--> P3B
    PICK <--> P4A
    PICK <--> P4B
    PICK <--> P4C
    PICK <--> P5A
    PICK <--> P5B
    PICK <--> P5C
    PICK <--> P5D
    PICK <--> P5E
    PICK <--> P5F
    PICK <--> P5G
    PICK <--> P5H
    PICK <--> P5I
    PICK <--> P5J
    PICK <--> P6A
    PICK <--> P6B
    PICK <--> P6C
    PICK <--> P8A
    PICK <--> P8B
    PICK <--> P8C
    PICK <--> P8D
    PICK --> P7A
    P7A --> PICK

    P3B -. test before notes .-> P4B
    P3B -. test before slides .-> P4C
    P3A -. test before beeps .-> P4A
    P3B -. or test before beeps .-> P4A
```
<!-- END GENERATED FLOWCHART -->
