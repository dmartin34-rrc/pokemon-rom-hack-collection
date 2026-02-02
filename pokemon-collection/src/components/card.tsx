// import cards from '../data/card.json';
// import type { Card } from '../types/cards';

// export function CardList() {
//   return cards.map((card) => {
//     return (
//       <div className="w-[400px]" key={card.title}>
//         <div>
//           <div className="relative">
//             <a>
//               <CardImage card={card} />
//             </a>
//             <CardTag card={card} />
//           </div>
//         </div>
//         <div>
//           <CardTitle card={card} />
//         </div>
//         <div>
//           <CardDescription card={card} />
//         </div>
//       </div>
//     );
//   });
// }

// export function Card({ title }: Pick<Card, 'title'>) {
//   const card = cards.find((c) => c.title == title);

//   if (!card) {
//     return null;
//   }

//   return (
//     <>
//       <div className="w-[400px]">
//         <div>
//           <div className="relative">
//             <a>
//               <CardImage card={card} />
//             </a>
//             <span>
//               <CardTag card={card} />
//             </span>
//           </div>
//         </div>
//         <div>
//           <CardTitle card={card} />
//         </div>
//         <div>
//           <CardDescription card={card} />
//         </div>
//       </div>
//     </>
//   );
// }

// function CardImage({ card }: { card: Card }) {
//   return (
//     <img
//       className="rounded-[15px] w-[400px] h-[250px]"
//       src={card.img}
//       alt={card.title}
//     />
//   );
// }

// function CardTitle({ card }: { card: Card }) {
//   return (
//     <h3>
//       <a>{card.title}</a>
//       <span className="bookmark"></span>
//     </h3>
//   );
// }

// function CardTag({ card }: { card: Card }) {
//   return (
//     <aside className="absolute top-40 left-4 bottom-4 w-[380px] flex items-end flex-wrap gap-2">
//       {card.tags.map((tag, index) => (
//         <a
//           href="#"
//           key={index}
//           className="bg-slate-500 text-white px-[0.4rem] py-[0.1rem] rounded-[5px] tracking-[1px] hover:bg-[#475569]"
//         >
//           {tag}
//         </a>
//       ))}
//     </aside>
//   );
// }

// function CardDescription({ card }: { card: Card }) {
//   return <p>{card.description}</p>;
// }
