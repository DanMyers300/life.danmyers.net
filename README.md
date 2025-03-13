# 🧬 life.danmyers.net 🧬

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Rust](https://img.shields.io/badge/Rust-54.9%25-orange.svg)](https://www.rust-lang.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-24.3%25-blue.svg)](https://www.typescriptlang.org/)
[![WebAssembly](https://img.shields.io/badge/WebAssembly-Powered-purple.svg)](https://webassembly.org/)

A high-performance implementation of Conway's Game of Life using Rust compiled to WebAssembly with a TypeScript frontend.

## ✨ Features

- 🚀 **High Performance**: Rust-powered simulation logic compiled to WebAssembly
- 🔢 **Bit Array Implementation**: Efficient memory usage with bit arrays controlling cell states
- 🖥️ **Modern UI**: Clean, responsive interface built with TypeScript
- 📱 **Responsive**: Works on desktop and mobile devices
- 🎨 **Customizable**: Multiple color themes and grid options
- ⚙️ **Nix-powered Development**: Reproducible builds using Nix flakes

## 🔍 Live Demo

Check out the live version at [life.danmyers.net](https://life.danmyers.net)

## 🛠️ Technology Stack

- **Backend**: Rust 🦀 (compiled to WebAssembly)
- **Frontend**: TypeScript, HTML, CSS
- **Build System**: Nix flake for reproducible development environment
- **Tooling**: Cargo for Rust package management

## 📸 Screenshots

*[Consider adding screenshots or GIFs of your application here showing different patterns and the UI]*

## 🏁 Getting Started

### Prerequisites

- Nix package manager (for using the development environment)
- Rust toolchain
- Node.js and npm/yarn
- wasm-pack

### Installation

# Clone the repository
git clone https://github.com/DanMyers300/life.danmyers.net.git
cd life.danmyers.net

# Enter the Nix development environment
nix develop

# Build the Rust code to WebAssembly
wasm-pack build

# Install JavaScript dependencies
cd www
npm install

# Start the development server
npm start

## 📚 About Conway's Game of Life

Conway's Game of Life is a cellular automaton devised by mathematician John Conway in 1970. It follows four simple rules:

1. Any live cell with fewer than two live neighbors dies (underpopulation)
2. Any live cell with two or three live neighbors lives on
3. Any live cell with more than three live neighbors dies (overpopulation)
4. Any dead cell with exactly three live neighbors becomes a live cell (reproduction)

## 💻 Technical Implementation

The game board is represented as an efficient bit array where each bit corresponds to a cell's state (alive or dead). This approach minimizes memory usage and allows for faster computation compared to traditional array implementations.

The core simulation logic is written in Rust and compiled to WebAssembly for speed, while maintaining the ability to run in any modern web browser. The bit manipulation operations in Rust provide optimal performance for updating the game state.

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.
