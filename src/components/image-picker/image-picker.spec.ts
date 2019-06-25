import { TestWindow } from '@stencil/core/testing';
import { ImagePicker } from './image-picker';

describe('image-picker', () => {
  it('should build', () => {
    expect(new ImagePicker()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLImagePickerElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [ImagePicker],
        html: '<image-picker></image-picker>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
