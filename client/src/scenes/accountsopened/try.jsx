import React, { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";

const options = [
  "Create a merge commit",
  "Squash and merge",
  "Rebase and merge",
];

const SplitButton = () => {
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="split button"
      >
        <Button>{options[selectedIndex]}</Button>
        <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      disabled={index === 2}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
};

const SecondButtonGroup = ({ selectedValue }) => {
  const [secondOptions, setSecondOptions] = useState([
    "Option A",
    "Option B",
    "Option C",
  ]);

  // Update secondOptions based on the selected value from the first ButtonGroup
  React.useEffect(() => {
    // You can implement your logic to update secondOptions based on selectedValue
    // For this example, we'll just append the selected merge strategy to the secondOptions
    setSecondOptions((prevOptions) => [...prevOptions, selectedValue]);
  }, [selectedValue]);

  return (
    <ButtonGroup variant="contained" aria-label="second button group">
      {secondOptions.map((option, index) => (
        <Button key={index}>{option}</Button>
      ))}
    </ButtonGroup>
  );
};

const MyComponent = () => {
  const [selectedMergeStrategy, setSelectedMergeStrategy] = useState(
    options[1]
  );

  return (
    <div>
      <SplitButton />
      <SecondButtonGroup selectedValue={selectedMergeStrategy} />
    </div>
  );
};

export default MyComponent;
