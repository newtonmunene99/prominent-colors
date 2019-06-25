import { TestWindow } from '@stencil/core/testing';
import { ColorPatch } from './color-patch';

describe('color-patch', () => {
  it('should build', () => {
    expect(new ColorPatch()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLColorPatchElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [ColorPatch],
        html: '<color-patch></color-patch>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
