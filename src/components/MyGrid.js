import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import GridItem from "./GridItem";
import CardItem from "./CardItem";
import {
  DummyChart1,
  DummyChart2,
  DummyChart3,
  DummyCard,
} from "./dummy-charts";

const ResponsiveGridLayout = WidthProvider(Responsive);

const COLUMNS_COUNT = 3;

const DEFAULT_CHARTS = [
  {
    id: "1",
    x: 0,
    y: 0,
    content: <DummyChart1 />,
  },
  {
    id: "2",
    x: 1,
    y: 0,
    content: <DummyChart2 />,
  },
  {
    id: "3",
    x: 0,
    y: 1,
    w: 3,
    content: <DummyChart3 />,
  },
  {
    id: "4",
    x: 0,
    y: 2,
    content: <DummyCard />,
  },
];

const mapGridItems = (items) =>
  items.map((item) => ({
    h: 1,
    minH: 1,
    maxH: 1,
    w: 1,
    i: `item${item.id}`,
    ...item,
  }));

export default function MyGrid() {
  const [items, setItems] = React.useState(DEFAULT_CHARTS);

  const gridItems = mapGridItems(items);

  const handleAddItem = () => {
    const lastItem = items.at(-1);

    const newItemIndex = Number(lastItem?.id) + 1;
    const newX = lastItem.x >= COLUMNS_COUNT - 1 ? 0 : lastItem.x + 1;
    const newY = lastItem.x >= COLUMNS_COUNT - 1 ? lastItem.y + 1 : lastItem.y;

    const newRandItem = {
      id: newItemIndex,
      x: newX,
      y: newY,
      content: [
        <DummyChart1 />,
        <DummyChart2 />,
        <DummyChart3 />,
        <DummyCard />,
      ][newItemIndex % 4],
    };

    setItems((prev) => [...prev, newRandItem]);
  };

  const handleRemoveItem = (itemId) => (e) => {
    setItems((prev) => prev.filter((prevItem) => prevItem.id !== itemId));
  };

  return (
    <div>
      <button type="button" onClick={handleAddItem} style={{ fontSize: 20 }}>
        Add new Random card
      </button>
      <ResponsiveGridLayout
        className="layout"
        layouts={{
          md: gridItems,
        }}
        rowHeight={350}
        breakpoints={{ md: 768, xxs: 0 }}
        cols={{ md: COLUMNS_COUNT, xxs: 1 }}
      >
        {gridItems.map((item) => (
          <GridItem
            key={item.i}
            onClose={handleRemoveItem(item.id)}
            content={<CardItem>{item.content}</CardItem>}
          />
        ))}
      </ResponsiveGridLayout>
    </div>
  );
}
