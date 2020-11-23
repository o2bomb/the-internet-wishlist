import { createIcon } from "@chakra-ui/react";

export const UserIcon = createIcon({
  displayName: "UserIcon",
  path: (
    <g fill="currentColor">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </g>
  )
})

export const HeartIcon = createIcon({
  displayName: "HeartIcon",
  path: (
    <g fill="currentColor">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </g>
  )
})