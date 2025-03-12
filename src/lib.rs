mod utils;

use std::fmt;
use wasm_bindgen::prelude::*;

extern crate fixedbitset;
use fixedbitset::FixedBitSet;

extern crate js_sys;

#[wasm_bindgen]
pub struct Universe {
  width: u32,
  height: u32,
  cells: FixedBitSet,
}

#[wasm_bindgen]
impl Universe {
  fn get_index(&self, row: u32, column: u32) -> usize {
    (row * self.width + column) as usize
  }

  fn live_neighbor_count(&self, row: u32, column: u32) -> u8 {
    let mut count = 0;
    for delta_row in [self.height - 1, 0, 1].iter().cloned() {
      for delta_col in [self.width - 1, 0, 1].iter().cloned() {
        if delta_row == 0 && delta_col == 0 {
          continue;
        }
        
        let neighbor_row = (row + delta_row) % self.height;
        let neighbor_col = (column + delta_col) % self.width;
        let idx = self.get_index(neighbor_row, neighbor_col);
        count += self.cells[idx] as u8;
      }
    }
    count
  }

  pub fn tick(&mut self) {
    let mut next = self.cells.clone();

    for row in 0..self.height {
      for col in 0..self.width {
        let idx = self.get_index(row, col);
        let cell = self.cells[idx];
        let live_neighbors = self.live_neighbor_count(row,col);
        next.set(idx, match (cell, live_neighbors) {
            (true, x) if x < 2 => false,
            (true, 2) | (true, 3) => true,
            (true, x) if x > 3 => false,
            (false, 3) => true,
            (otherwise, _) => otherwise
        });
      }
    }
    self.cells = next;
  }

  pub fn new(w: u32, h: u32) -> Universe {
      let width = w;
      let height = h;

      let size = (w * h) as usize;
      let mut cells = FixedBitSet::with_capacity(size);
  
      for i in 0..size {
          //cells.set(i, i % 2 == 0 || i % 7 == 0);
          cells.set(i, js_sys::Math::random() < 0.5);
      }
  
      Universe {
          width,
          height,
          cells,
      }
  }

  pub fn render(&self) -> String {
      self.to_string()
  }

  pub fn width(&self) -> u32 {
    self.width
  }

  pub fn set_width(&mut self, width: u32) {
    self.width = width;
    let size = (width * self.height) as usize;
    self.cells = FixedBitSet::with_capacity(size);
  }

  pub fn height(&self) -> u32 {
    self.height
  }

  pub fn set_height(&mut self, height: u32) {
    self.height = height;
    let size = (self.width * height) as usize;
    self.cells = FixedBitSet::with_capacity(size);
  }

  pub fn cells(&self) -> *const u32 {
    self.cells.as_slice().as_ptr() as *const u32
  }
}

impl Universe {
  /// Get the dead and alive values of the entire universe.
  pub fn get_cells(&self) -> &FixedBitSet {
    &self.cells
  }

  /// Set cells to be alive in a universe by passing the row and column
  /// of each cell as an array.
  pub fn set_cells(&mut self, cells: &[(u32, u32)]) {
    for (row, col) in cells.iter().cloned() {
      let idx = self.get_index(row, col);
      self.cells.set(idx, true);
    }
  }
}

impl fmt::Display for Universe {
  fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
      for line in self.cells.as_slice().chunks(self.width as usize) {
          for &cell in line {
              let symbol = if cell == 1 { '◼' } else { '◻' };
              write!(f, "{}", symbol)?;
          }
          write!(f, "\n")?;
      }
      Ok(())
  }
}
