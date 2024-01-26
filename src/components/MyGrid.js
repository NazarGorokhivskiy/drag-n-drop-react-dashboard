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
import Toolbox from "./Toolbox";

const ResponsiveGridLayout = WidthProvider(Responsive);

const COLUMNS_COUNT = 3;

const getLastDigits = (str = "") => str.replace("item", "");

const DEFAULT_CHARTS = [
  {
    id: "1",
    x: 0,
    y: 0,
    h: 1,
    w: 1,
    content: <DummyChart1 />,
  },
  {
    id: "2",
    x: 1,
    y: 0,
    h: 1,
    w: 1,
    content: <DummyChart2 />,
  },
  {
    id: "3",
    x: 0,
    y: 1,
    h: 1,
    w: 3,
    content: <DummyChart3 />,
  },
  {
    id: "4",
    x: 0,
    y: 2,
    h: 1,
    w: 1,
    content: <DummyCard />,
  },
];

const mapGridItems = (items) =>
  items.map((item) => ({
    i: `item${item.id}`,
    ...item,
  }));

export default function MyGrid() {
  const [items, setItems] = React.useState(DEFAULT_CHARTS);
  const [toolboxCharts, setToolboxCharts] = React.useState([]);

  const gridItems = mapGridItems(items);

  const handleAddItem = () => {
    const lastItem = items.at(-1) ?? { id: -1 };

    const newItemIndex = Number(lastItem?.id) + 1;
    const newX = lastItem.x >= COLUMNS_COUNT - 1 ? 0 : lastItem.x + 1;
    const newY = lastItem.x >= COLUMNS_COUNT - 1 ? lastItem.y + 1 : lastItem.y;

    const newRandItem = {
      id: String(newItemIndex),
      x: Number(newX),
      y: Number(newY),
      h: 1,
      w: 1,
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
    const removeItem = items.find((item) => item.id === itemId);

    setItems((prev) => prev.filter((prevItem) => prevItem.id !== itemId));
    setToolboxCharts((prev) => [...prev, removeItem]);
  };

  const onTakeItemFromToolbox = (item) => {
    setItems((prev) => [...prev, item]);
    setToolboxCharts((prev) =>
      prev.filter((prevItem) => prevItem.id !== item.id)
    );
  };

  const onLayoutChange = (layout) => {
    setItems((prev) =>
      prev.map((prevItem) => {
        const newItemLayout = layout.find(
          (item) => getLastDigits(item.i) === prevItem.id
        );

        return {
          ...prevItem,
          w: newItemLayout.w,
          h: newItemLayout.h,
          x: newItemLayout.x,
          y: newItemLayout.y,
        };
      })
    );
  };

  return (
    <div>
      <button type="button" onClick={handleAddItem} style={{ fontSize: 20, marginBottom: 16 }}>
        Add new Random card
      </button>
      <Toolbox items={toolboxCharts} onSelect={onTakeItemFromToolbox} />
      <ResponsiveGridLayout
        className="layout"
        layouts={{
          md: gridItems,
        }}
        rowHeight={350}
        breakpoints={{ md: 768, xxs: 0 }}
        cols={{ md: COLUMNS_COUNT, xxs: 1 }}
        onLayoutChange={onLayoutChange}
      >
        {gridItems.map((item) => (
          <GridItem
            key={item.i}
            onClose={handleRemoveItem(item.id)}
            content={<CardItem id={item.id}>{item.content}</CardItem>}
          />
        ))}
      </ResponsiveGridLayout>
    </div>
  );
}
