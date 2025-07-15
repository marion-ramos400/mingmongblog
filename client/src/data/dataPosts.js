const data = [
  {
    id: 1,
    title: "On the way, and Out of Money",
    content: `Back when I was first trying to understand CSS, one of the biggest mysteries to me was why height sometimes wouldn't work.
    I've given this paragraph height: 50% but as you can see`
    //50%, but as you can see, it hasn't grown at all! In fact, it doesn't matter whether I set height: 100% or height: 10000% or height: 0%. Nothing happens.
    
    
//
//    In my first few years with CSS, I developed a bit of an intuition for when it would work and when it wouldn't, but it always sorta felt like rolling the dice. Sometimes it wouldn't work even when it really seemed like it should!
  

//    Like with so much in CSS, it feels random until you learn about the underlying mechanisms that explain the behaviour, and then it all makes perfect sense. In this blog post, we'll learn what's going on here and I'll share how I solve these sorts of problems.
//    A circular calculation
//
//    So here's the core thing to know: in CSS, width and height are fundamentally different. By default, they're calculated in totally opposite ways.
//
//    This becomes obvious when we really think about it. Block-level elements like <div> will expand to take up all available width, but they don't do that for height. Instead, they shrinkwrap around their children:
//
//
//    Notice that the height grows and shrinks with the # of lines, but the width always stays maxed-out, even when there isn't any content!
//
//    Now, I recognize that this isn't terribly surprising or mindblowing. This feels totally normal. But it gets interesting when we think about what this tells us about how these values are calculated.
//
//    When calculating an element's default width, the browser looks up the tree, to the element's parent. But when calculating an element's default height, well, that depends on the element's children. So the browser has to look down the tree instead.
//
//    So, when we tell an element to have width: 50%, that's no big deal. Browsers already use their parent's size to calculate their width, so it's an easy thing to say “OK, take up 50% of that available space".
//
//    But when we tell an element to have height: 50%, it's a different story:
//
//    The child is saying "I want to be 50% of my parent's height".
//
//        The parent is saying "I want to be the smallest height required to contain my children".
//
//    See the problem? They're trying to derive their size from each other. It's a circular calculation that never resolves. A mystery wrapped in a riddle. A paradox. As a result, browsers will ignore the height: 50% declaration on the child.
//    `

  }
]

export default data;
