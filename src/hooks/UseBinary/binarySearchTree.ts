/*
 * Binary Search Tree implementation in JavaScript
 * Copyright (c) 2009 Nicholas C. Zakas
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * A binary search tree implementation in JavaScript. This implementation
 * does not allow duplicate values to be inserted into the tree, ensuring
 * that there is just one instance of each value.
 * @class BinarySearchTree
 * @constructor
 */
 export type Maybe<T> = T | null;

 export interface Node {
   value: number;
   parent: Maybe<number>;
   left: Maybe<Node>;
   right: Maybe<Node>;
   data: any;
 }

export class BinarySearchTree {
  public _root:Maybe<Node> = null;
  public currentView:Maybe<Node> = null;
  get root():Maybe<Node> {
    return this._root;
  }

  public add (value:number, data:any):void {
    //create a new item object, place data in
    const node:Node = {
      value: value,
      parent: null,
      left: null,
      right: null,
      data
    };
    let current: Node;
    //special case: no items in the tree yet
    if (this._root === null) {
      this._root = node;
    } else {
      current = this._root;

      while (true) {

        //if the new value is less than this node's value, go left
        if (value < current.value) {

          //if there's no left, then the new node belongs there
          if (current.left === null) {
            current.left = node;
            break;
          } else {
            current = current.left;
          }

          //if the new value is greater than this node's value, go right
        } else if (value > current.value) {

          //if there's no right, then the new node belongs there
          if (current.right === null) {
            current.right = node;
            break;
          } else {
            current = current.right;
          }

          //if the new value is equal to the current one, just ignore
        } else {
          break;
        }
      }
    }
  }

  public get (value: number):Maybe<Node> {
    let found:boolean = false;
    let current:Maybe<Node> = this._root;
    while(!found && current) {
      if(value < current.value){
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        found = true;
      }
    }

    return current;
  }

  public contains (value:number):boolean {

    var found:boolean = false,
        current: Maybe<Node> = this._root;
        while(!found && current) {

          //if the value is less than the current node's, go left
          if (value < current.value) {
            current = current.left;

            //if the value is greater than the current node's, go right
          } else if (value > current.value) {
            current = current.right;

            //values are equal, found it!
          } else {
            found = true;
          }
        }

        return found;

  }

  public size ():number {
    let length = 0;
    this.traverse((node:Node) => {
      length++;
    });
    return length;
  }

  public toArray ():number[] {
    const result:number[] = [];

    this.traverse((node:Node) => {
      result.push(node.value);
    });

    return result;
  }

  public toString ():string {
    return this.toArray().toString();
  }

  public traverse (process: (node:Node) => void):void {

    //helper function
    function inOrder(node: Maybe<Node>) {
      if (node) {

        //traverse the left subtree
        if (node.left !== null) {
          inOrder(node.left);
        }

        //call the process method on this node
        process.call(this, node);

        //traverse the right subtree
        if (node.right !== null) {
          inOrder(node.right);
        }
      }
    }

    //start with the root
    inOrder(this._root);
  }

}
