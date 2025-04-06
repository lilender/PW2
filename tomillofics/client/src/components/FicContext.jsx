import { createContext, useState, useContext } from "react";

const FicContext = createContext();

export const FicProvider = ({ children }) => {
    const [fic, setFic] = useState({
        id: 0,
        title: "",
        description: "",
        completed: false,
        img_route: "/img/default-cover.png",
        file: null,
        tags: [],
        chapters: [],
    });

    const addChapter = (chapter) => {
        setFic((prev) => ({
            ...prev,
            chapters: [...prev.chapters, chapter],
        }));
    };

    const removeChapter = (id) => {
        setFic((prev) => {
            const newChapters = [...prev.chapters];
            newChapters.splice(id-1, 1);
            newChapters.forEach((chapter, i) => {
                chapter.id = i + 1;
            });
            return { ...prev, chapters: newChapters };
        });
    }

    const updateChapter = (id, updatedChapter) => {
        setFic((prev) => {
            const newChapters = [...prev.chapters];
            newChapters[id-1] = updatedChapter;
            return { ...prev, chapters: newChapters };
        });
    };

    return (
        <FicContext.Provider value={{ fic, setFic, addChapter, updateChapter, removeChapter }}>
            {children}
        </FicContext.Provider>
    );
};

export const useFic = () => useContext(FicContext);
