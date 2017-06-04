/**
 * Webpack will wrap this module as a chunk.
 * Later, it will be loaded async by the main App.
 *
 * @module ChunkExample
 */

export default class ChunkExample {
  constructor(pageName) {
    this.pageName = pageName;
  }

  consoleLogPageName() {
    console.log(`This is ${this.pageName} page`);
  }
}