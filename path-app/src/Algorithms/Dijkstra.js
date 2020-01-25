
// algorithm
export function Dijkstra(grid, start_node, finish_node){
    const visted_node = [];
    start_node.distance = 0;
    // calls all_nodes function
    const unvisited = all_Nodes(grid);
    while(unvisited.length){
        sort(unvisited);
        const closest = unvisited.shift();

        // skip wall
        if(closest.wall) 
        continue;
        // if a node is infinity, then shortest path has been found
        if(closest.distance === Infinity)
        return visted_node;
        closest.isVisited = true;
        visted_node.push(closest);
        if(closest === finish_node)
        return visted_node;
        // call update function
        update_unvisited(closest,grid);
    }
}

// sort nodes
function sort(unvisited){
    unvisited.sort((node1, node2) => node1.distance - node2.distance);
}

function update_unvisited(node, grid){
    const unvisited_n = unvisited_neighbors(node,grid);
    for(const neighbor of unvisited_n){
        neighbor.distance = node.distance +1;
        neighbor.previous_node = node;
    }
}

// checks neighbors
function unvisited_neighbors(node, grid) {
    const neighbors = [];
    const {columns, rows} = node;
    if (rows > 0) neighbors.push(grid[rows - 1][columns]);
    if (rows < grid.length - 1) neighbors.push(grid[rows + 1][columns]);
    if (columns > 0) neighbors.push(grid[rows][columns - 1]);
    if (columns < grid[0].length - 1) neighbors.push(grid[rows][columns + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
  }
  

// gathers all nodes
function all_Nodes(grid) {
    const nodes = [];
    for (const rows of grid) {
      for (const node of rows) {
        nodes.push(node);
      }
    }
    return nodes;
  }

// export function shortestpath(finish_node){
//    const shortest = [];
//    let current = finish_node;
//    while(current !== null){
//     shortest.unshift(current);
//     current = current.previous
//     }
//    return shortest;
// }

export function shortestpath(finish_node) {
    const shortest = [];
    let current = finish_node;
    while (current !== null) {
      shortest.unshift(current);
      current = current.previous_node;
    }
    return shortest;
  }