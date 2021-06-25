export const bytesToSize = (bytes, decimals = 2) => {
  if (!bytes || bytes === 0) return "0 Byte";
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const dm = decimals < 0 ? 0 : decimals;
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return parseFloat(bytes / Math.pow(1024, i)).toFixed(dm) + " " + sizes[i];
};

export const sortParentChild = (data, root = null) => {
  var t = {};
  data.forEach((o) => {
    Object.assign((t[o.id] = t[o.id] || {}), o);
    o.parentCategory = o.parentCategory || null;
    t[o.parentCategory] = t[o.parentCategory] || {};
    t[o.parentCategory].children = t[o.parentCategory].children || [];
    t[o.parentCategory].children.push(t[o.id]);
  });
  return t[root].children;
};

export const sortCategoryList = (data, parent, depth) => {
  const returnData = [];
  parent.forEach((element) => {
    element.depth = depth;
    returnData.push({ ...element });
    const child = data.filter((obj) => element.id === obj.parentCategory);
    if (child.length > 0) {
      const newData = sortCategoryList(data, child, depth + 1);
      returnData.push(...newData);
    }
  });
  return returnData;
};

export const findParentCategory = async (data, element, index) => {
  let previousElement = data[index - 1];
  if (previousElement.depth === element.depth - 1) {
    return { ...previousElement };
  } else {
    previousElement = await findParentCategory(data, element, index - 1);
    return { ...previousElement };
  }
};

export const dynamicSort = (property) => {
  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    var result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
};

export const mapSelectData = (data, selectedValues) => {
  return data.map((node) => {
    if (selectedValues.includes(node.label)) {
      return {
        ...node,
        children: node.children ? mapSelectData(node.children, selectedValues) : [],
        checked: true,
      };
    }
    return {
      ...node,
      checked: false,
      children: node.children ? mapSelectData(node.children, selectedValues) : [],
    };
  });
}
