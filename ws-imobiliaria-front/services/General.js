export function phoneNumberFormatter(v) {
    var r = v.replace(/\D/g, "");
    r = r.replace(/^0/, "");
    if (r.length > 10) {
        r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (r.length > 5) {
        r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (r.length > 2) {
        r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    } else {
        r = r.replace(/^(\d*)/, "($1");
    }
    return r;
}

function swap(items, leftIndex, rightIndex) {
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
}
function ascPartition(items, left, right, orderBy) {
    if (items) {
        var pivot = items[Math.floor((right + left) / 2)],
            i = left,
            j = right;
        while (i <= j) {
            while (items[i][orderBy] < pivot[orderBy]) {
                i++;
            }
            while (items[j][orderBy] > pivot[orderBy]) {
                j--;
            }
            if (i <= j) {
                swap(items, i, j);
                i++;
                j--;
            }
        }
        return i;
    }
}
function descPartition(items, left, right, orderBy) {
    if (items) {
        var pivot = items[Math.floor((left + right) / 2)],
            i = right,
            j = left;
        while (i <= j) {
            while (items[i][orderBy] < pivot[orderBy]) {
                i++;
            }
            while (items[j][orderBy] > pivot[orderBy]) {
                j--;
            }
            if (i <= j) {
                swap(items, i, j);
                i++;
                j--;
            }
        }
        return i;
    }
}
export function QuickSort(items, left, right, orderBy, orientation) {
    var index;
    if (items.length > 1) {
        index = (orientation.toUpperCase() == "ASC") ? ascPartition(items, left, right, orderBy) : descPartition(items, left, right, orderBy);
        if (left < index - 1) {
            QuickSort(items, left, index - 1, orderBy, orientation);
        }
        if (index < right) {
            QuickSort(items, index, right, orderBy, orientation);
        }
    }
    return items;
}