import React, { useState } from "react";
import styled from "styled-components";

import { VscDebugStart } from "react-icons/vsc";
import { VscDebugRestart } from "react-icons/vsc";
import { ImPause } from "react-icons/im";

import Slider from "@material-ui/core/Slider";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import shallow from "zustand/shallow";

import { useControls, useData } from "../common/store";

import { delay } from "../common/helper";
import {
  convertInputToArrayString,
  convertArrayStringToArray,
  getRandomArray,
} from "../common/helper";

