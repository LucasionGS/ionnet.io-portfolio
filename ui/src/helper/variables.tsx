import React from "react"

/**
 * My calculated age.
 */
export const age = Math.floor((Date.now() - new Date(2002, 2, 9).getTime()) / 1000 / 60 / 60 / 24 / 365.25);

const variables = {
  age,
};

export default variables;