const obj = {
  name: 'Dhruvkumar',
  getName: function () {
    // const arrow = () => {
    //   console.log(this.name); // ✅ "Dhruvkumar"
    // };
    function normal() {
      console.log(this.name);
    }
    normal();
    // arrow();
  },
};
obj.getName();
