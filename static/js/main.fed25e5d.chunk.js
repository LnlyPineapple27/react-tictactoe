(this.webpackJsonpassignment01=this.webpackJsonpassignment01||[]).push([[0],{14:function(e,t,r){},9:function(e,t,r){"use strict";r.r(t);var s=r(8),n=r(3),i=r(4),a=r(6),c=r(5),u=r(1),l=r.n(u),o=r(7),h=r.n(o),d=(r(14),r(0));function j(e){var t=e.highlight?"square highlight":"square";return Object(d.jsx)("button",{className:t,onClick:e.onClick,children:e.value})}var v=function(e){Object(a.a)(r,e);var t=Object(c.a)(r);function r(){return Object(n.a)(this,r),t.apply(this,arguments)}return Object(i.a)(r,[{key:"renderSquare",value:function(e){var t=this;return Object(d.jsx)(j,{value:this.props.squares[e],onClick:function(){return t.props.onClick(e)},highlight:this.props.winSquares&&this.props.winSquares.includes(e)})}},{key:"renderRow",value:function(e){for(var t=[],r=0;r<5;++r)t.push(this.renderSquare(e+r));return Object(d.jsx)("div",{className:"board-row",children:t})}},{key:"render",value:function(){for(var e=[],t=0;t<Math.pow(5,2);t+=5)e.push(this.renderRow(t));return Object(d.jsx)("div",{children:e})}}]),r}(l.a.Component),b=function(e){Object(a.a)(r,e);var t=Object(c.a)(r);function r(e){var s;return Object(n.a)(this,r),(s=t.call(this,e)).state={history:[{squares:Array(Math.pow(5,2)).fill(null)}],stepNumber:0,xIsNext:!0,AscMovelist:!0},s}return Object(i.a)(r,[{key:"handleClick",value:function(e){var t=this.state.history.slice(0,this.state.stepNumber+1),r=t[t.length-1].squares.slice();p(r).winner||r[e]||(r[e]=this.state.xIsNext?"X":"O",this.setState({history:t.concat([{squares:r,currentMove:e}]),stepNumber:t.length,xIsNext:!this.state.xIsNext}))}},{key:"jumpTo",value:function(e){this.setState({stepNumber:e,xIsNext:e%2===0})}},{key:"render",value:function(){var e=this,t=this.state.history,r=t[this.state.stepNumber],s=p(r.squares),n=s.winner,i=t.map((function(t,r){var s=t.currentMove%5,n=~~(t.currentMove/5),i=r?"Go to move #"+r+" [col: "+s+" - row: "+n+"]":"Go to game start";return Object(d.jsx)("li",{children:Object(d.jsx)("button",{className:r===e.state.stepNumber?"currently-selected-move-list":"",onClick:function(){return e.jumpTo(r)},children:i})},r)})),a=n?"Winner: "+n:s.drawResult?"Draw!!":"Next player: "+(this.state.xIsNext?"X":"O");return this.state.AscMovelist||i.reverse(),Object(d.jsxs)("div",{className:"game",children:[Object(d.jsxs)("div",{id:"author",children:[Object(d.jsx)("h1",{children:"Tictactoe assignment 01"}),Object(d.jsx)("p",{children:"by Phan Tan Dat - 18127078"})]}),Object(d.jsx)("div",{className:"game-board",children:Object(d.jsx)(v,{squares:r.squares,onClick:function(t){return e.handleClick(t)},winSquares:s.winSquares})}),Object(d.jsxs)("div",{className:"game-info",children:[Object(d.jsx)("div",{children:a}),Object(d.jsx)("button",{onClick:function(){return e.changSortOrder()},children:this.state.AscMovelist?"Descending":"Ascending"}),Object(d.jsx)("ol",{children:i})]})]})}},{key:"changSortOrder",value:function(){this.setState({AscMovelist:!this.state.AscMovelist})}}]),r}(l.a.Component);function p(e){for(var t=[[0,1,2,3,4],[5,6,7,8,9],[10,11,12,13,14],[15,16,17,18,19],[20,21,22,23,24],[0,5,10,15,20],[1,6,11,16,21],[2,7,12,17,22],[3,8,13,18,23],[4,9,14,19,24],[0,6,12,18,24],[4,8,12,16,20]],r=0;r<t.length;r++){var n=Object(s.a)(t[r],5),i=n[0],a=n[1],c=n[2],u=n[3],l=n[4];if(e[i]&&e[i]===e[a]&&e[i]===e[c]&&e[i]===e[u]&&e[i]===e[l])return{winner:e[i],drawResult:!1,winSquares:t[r]}}for(var o=0;o<e.length;o++)if(null===e[o])return{winner:null,drawResult:!1,winSquares:null};return{winner:null,drawResult:!0,winSquares:null}}h.a.render(Object(d.jsx)(b,{}),document.getElementById("root"))}},[[9,1,2]]]);
//# sourceMappingURL=main.fed25e5d.chunk.js.map