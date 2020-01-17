
// algorithm
export function Dijkstra(grid, start_node, finish_node){
    const visted = [];
    distance[start_node] = 0;
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
        return visted
        closest.visted = true;
        visted.push(closest);
        if(closest === finish_node)
        return visted;
        // call update function
        update(closest,grid);
    }
}

// sort nodes
function sort(unvisited){
    unvisited.sort((node1, node2) => node1.distance - node2.distance);
}

function update(node, grid){
    const unvisited = all_Nodes(node,grid)
    for(const neighbor of unvisited){
        neighbor.distance = node.distance +1;
        neighbor.previous = node;
    }
}

// gather all the nodes
function all_Nodes(grid){
    const nodes = [];
    for(const rows of grid)
    for(const node of rows){
        nodes.push(nodes)
    }
}
return nodes;
