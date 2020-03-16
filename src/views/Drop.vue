<style>
form {
  display: block;
  height: 400px;
  width: 400px;
  background: #ccc;
  margin: auto;
  margin-top: 40px;
  text-align: center;
  line-height: 400px;
  border-radius: 4px;
}
</style>

<template>
  <div id="file-drag-drop">
    <form ref="fileform">
      <span class="drop-files">Drop the files here!</span>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dragAndDropCapable: false,
      files: []
    };
  },
  mounted() {
    /*
    Determine if drag and drop functionality is capable in the browser
  */
    this.dragAndDropCapable = this.determineDragAndDropCapable();

    /*
    If drag and drop capable, then we continue to bind events to our elements.
  */
    if (this.dragAndDropCapable) {
      /*
      Listen to all of the drag events and bind an event listener to each
      for the fileform.
    */
      [
        "drag",
        "dragstart",
        "dragend",
        "dragover",
        "dragenter",
        "dragleave",
        "drop"
      ].forEach(
        function(evt) {
          /*
        For each event add an event listener that prevents the default action
        (opening the file in the browser) and stop the propagation of the event (so
        no other elements open the file in the browser)
      */
          this.$refs.fileform.addEventListener(
            evt,
            function(e) {
              e.preventDefault();
              e.stopPropagation();
            }.bind(this),
            false
          );
        }.bind(this)
      );

      /*
      Add an event listener for drop to the form
    */
      this.$refs.fileform.addEventListener(
        "drop",
        function(e) {
          /*
        Capture the files from the drop event and add them to our local files
        array.
      */
          for (let i = 0; i < e.dataTransfer.files.length; i++) {
            this.files.push(e.dataTransfer.files[i]);
          }
        }.bind(this)
      );
    }
  },
  methods: {
    determineDragAndDropCapable() {
      /*
    Create a test element to see if certain events
    are present that let us do drag and drop.
  */
      var div = document.createElement("div");

      /*
    Check to see if the `draggable` event is in the element
    or the `ondragstart` and `ondrop` events are in the element. If
    they are, then we have what we need for dragging and dropping files.

    We also check to see if the window has `FormData` and `FileReader` objects
    present so we can do our AJAX uploading
  */
      return (
        ("draggable" in div || ("ondragstart" in div && "ondrop" in div)) &&
        "FormData" in window &&
        "FileReader" in window
      );
    }
  }
};
</script>
