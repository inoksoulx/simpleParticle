var simpleParticle = (function () {
  var canvas = document.getElementById("canvas"),
      context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var maxDist = 100;
  var nodes = [];

  for (var i = 0; i < 200; i++) {
    nodes.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: Math.random() * 2 - 1,
      vy: Math.random() * 2 - 1
    });
  }

  update();

  function update() {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (var i = 0; i < 200; i++) {
      var node = nodes[i];
      node.x += node.vx;
      node.y += node.vy;
      if (node.x > 800) {
        node.x = 0;
      } else if (node.x < 0) {
        node.x = 800;
      }
      if (node.y > 800) {
        node.y = 0;
      } else if (node.y < 0) {
        node.y = 800;
      }
      context.beginPath();
      context.arc(node.x, node.y, 2, 0, Math.PI * 2);
      context.fill();
    }

    for (var i = 0; i < nodes.length - 1; i++) {
      var nodeA = nodes[i];
      for (var j = i + 1; j < nodes.length; j++) {
        var nodeB = nodes[j];
        var dx = nodeB.x - nodeA.x,
          dy = nodeB.y - nodeA.y,
          dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          context.lineWidth = 1 - dist / maxDist;
          context.beginPath();
          context.moveTo(nodeA.x, nodeA.y);
          context.lineTo(nodeB.x, nodeB.y);
          context.stroke();
        }
      }
    }
    requestAnimationFrame(update);
  }
})();
