# Refactor Cookie Preferences Popup Plan

**Goal:** Refactor `src/components/PrivacyPreferences.tsx` to be a fixed popup in the bottom-left corner, ensuring responsiveness, visibility, and a flatter appearance across all devices and states.

**Final Plan:**

1.  **Identify Component:** `src/components/PrivacyPreferences.tsx`.
2.  **Modify Positioning & Container:**
    *   Update the main `motion.div` (line 46):
        *   Remove classes: `inset-0`, `items-center`, `justify-center`, `p-4`, `bg-blue-900/20`, `backdrop-blur-sm`.
        *   Add classes: `fixed bottom-4 left-4 z-50` (Ensures bottom-left position and stays on top).
    *   Update the inner container `div` (line 52):
        *   Remove `max-w-md`.
        *   Add responsive width: `w-11/12 max-w-sm sm:w-96` (Adapts width, prevents taking full screen).
        *   Reduce shadow for a "flatter" look: Change `shadow-xl` to `shadow-lg`.
3.  **Refine Inner Layout (Mobile-First):**
    *   Verify padding (`p-6`) and spacing (`space-y-4`, `gap-3`) work well in the corner.
    *   Confirm button widths (`w-full`) are suitable.
    *   Ensure preference checkboxes (`flex items-center justify-between`) remain aligned on small screens. The `max-w-sm sm:w-96` should prevent the content itself from becoming too wide and causing overflow issues when expanded.
4.  **Adjust Animations:**
    *   Update `motion.div` props (lines 47-49) for a bottom-left slide-in/out:
        *   `initial={{ opacity: 0, x: -50, y: 50 }}`
        *   `animate={{ opacity: 1, x: 0, y: 0 }}`
        *   `exit={{ opacity: 0, x: -50, y: 50 }}`
5.  **Testing:** Thoroughly test responsiveness and visibility on various screen sizes (mobile, tablet, desktop) in both initial and expanded states, confirming no part disappears off-screen.

**Visual Plan (Mermaid Diagram):**

```mermaid
graph TD
    A[Start: Centered Modal (Overflow Issue)] --> B{Locate Component: PrivacyPreferences.tsx};
    B --> C{Analyze Current Implementation};
    C --> D{Define Goal: Fixed Bottom-Left Popup (Responsive, Flat)};
    D --> E{Plan Refactoring Steps};
    E --> F[1. Change Positioning (fixed bottom-4 left-4 z-50)];
    E --> G[2. Adjust Container Size (w-11/12 max-w-sm sm:w-96, shadow-lg)];
    E --> H[3. Refine Inner Layout (mobile-first)];
    E --> I[4. Update Animations (slide-in from bottom-left)];
    E --> J[5. Remove Backdrop];
    F & G & H & I & J --> K{Review Final Plan};
    K -- User Approval --> L{Optional: Save Plan to MD};
    L --> M[Switch to Code Mode];
    M --> N[Implement Changes];
    N --> O[Test Responsiveness & Visibility];
    O --> P[End: Responsive Bottom-Left Corner Popup];
    K -- User Revision --> E;