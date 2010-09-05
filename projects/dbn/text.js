/*

AST tree generated from parsing the following Design By Numbers program:

paper 30

repeat A 0 300
{
    pen 50
    line 0 55 100 55
    line 0 20 100 20

    pen 100
    line (A*2) 0 (A*2) 20
    line (A/3)  55 (A/3) 100
}

You can find the blog article that explains it at 
http://www.sergimansilla.com/blog/writing-a-javascript-interpreter-for-dbn-using-canvas-I/

*/

var test = 
[
   {
      "type": "command",
      "name": "paper",
      "args": [
         {
            "type": "integer",
            "value": 50
         }
      ]
   },
   {
      "type": "command",
      "name": "command",
      "args": [
         {
            "type": "string",
            "value": "square"
         },
         {
            "type": "string",
            "value": "x"
         },
         {
            "type": "string",
            "value": "y"
         },
         {
            "type": "string",
            "value": "s"
         },
         {
            "type": "string",
            "value": "c"
         }
      ],
      "block": [
         {
            "type": "command",
            "name": "pen",
            "args": [
               {
                  "type": "string",
                  "value": "c"
               }
            ]
         },
         {
            "type": "command",
            "name": "line",
            "args": [
               {
                  "type": "string",
                  "value": "x"
               },
               {
                  "type": "string",
                  "value": "y"
               },
               {
                  "type": "string",
                  "value": "x"
               },
               {
                  "type": "command",
                  "name": "+",
                  "args": [
                     {
                        "type": "string",
                        "value": "y"
                     },
                     {
                        "type": "string",
                        "value": "s"
                     }
                  ]
               }
            ]
         },
         {
            "type": "command",
            "name": "line",
            "args": [
               {
                  "type": "string",
                  "value": "x"
               },
               {
                  "type": "command",
                  "name": "+",
                  "args": [
                     {
                        "type": "string",
                        "value": "y"
                     },
                     {
                        "type": "string",
                        "value": "s"
                     }
                  ]
               },
               {
                  "type": "command",
                  "name": "+",
                  "args": [
                     {
                        "type": "string",
                        "value": "x"
                     },
                     {
                        "type": "string",
                        "value": "s"
                     }
                  ]
               },
               {
                  "type": "command",
                  "name": "+",
                  "args": [
                     {
                        "type": "string",
                        "value": "y"
                     },
                     {
                        "type": "string",
                        "value": "s"
                     }
                  ]
               }
            ]
         },
         {
            "type": "command",
            "name": "line",
            "args": [
               {
                  "type": "command",
                  "name": "+",
                  "args": [
                     {
                        "type": "string",
                        "value": "x"
                     },
                     {
                        "type": "string",
                        "value": "s"
                     }
                  ]
               },
               {
                  "type": "command",
                  "name": "+",
                  "args": [
                     {
                        "type": "string",
                        "value": "y"
                     },
                     {
                        "type": "string",
                        "value": "s"
                     }
                  ]
               },
               {
                  "type": "command",
                  "name": "+",
                  "args": [
                     {
                        "type": "string",
                        "value": "x"
                     },
                     {
                        "type": "string",
                        "value": "s"
                     }
                  ]
               },
               {
                  "type": "string",
                  "value": "y"
               }
            ]
         },
         {
            "type": "command",
            "name": "line",
            "args": [
               {
                  "type": "command",
                  "name": "+",
                  "args": [
                     {
                        "type": "string",
                        "value": "x"
                     },
                     {
                        "type": "string",
                        "value": "s"
                     }
                  ]
               },
               {
                  "type": "string",
                  "value": "y"
               },
               {
                  "type": "string",
                  "value": "x"
               },
               {
                  "type": "string",
                  "value": "y"
               }
            ]
         }
      ]
   },
   {
      "type": "command",
      "name": "repeat",
      "args": [
         {
            "type": "string",
            "value": "A"
         },
         {
            "type": "integer",
            "value": 0
         },
         {
            "type": "integer",
            "value": 9
         }
      ],
      "block": [
         {
            "type": "command",
            "name": "repeat",
            "args": [
               {
                  "type": "string",
                  "value": "B"
               },
               {
                  "type": "integer",
                  "value": 0
               },
               {
                  "type": "integer",
                  "value": 9
               }
            ],
            "block": [
               {
                  "type": "command",
                  "name": "square",
                  "args": [
                     {
                        "type": "command",
                        "name": "+",
                        "args": [
                           {
                              "type": "command",
                              "name": "*",
                              "args": [
                                 {
                                    "type": "string",
                                    "value": "A"
                                 },
                                 {
                                    "type": "integer",
                                    "value": 10
                                 }
                              ]
                           },
                           {
                              "type": "integer",
                              "value": 3
                           }
                        ]
                     },
                     {
                        "type": "command",
                        "name": "+",
                        "args": [
                           {
                              "type": "command",
                              "name": "*",
                              "args": [
                                 {
                                    "type": "string",
                                    "value": "B"
                                 },
                                 {
                                    "type": "integer",
                                    "value": 10
                                 }
                              ]
                           },
                           {
                              "type": "integer",
                              "value": 3
                           }
                        ]
                     },
                     {
                        "type": "integer",
                        "value": 3
                     },
                     {
                        "type": "command",
                        "name": "+",
                        "args": [
                           {
                              "type": "string",
                              "value": "A"
                           },
                           {
                              "type": "command",
                              "name": "*",
                              "args": [
                                 {
                                    "type": "string",
                                    "value": "B"
                                 },
                                 {
                                    "type": "integer",
                                    "value": 10
                                 }
                              ]
                           }
                        ]
                     }
                  ]
               }
            ]
         }
      ]
   }
]

