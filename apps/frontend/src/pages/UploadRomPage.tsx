import { useState } from 'react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { uploadRom } from '../apis/uploadRomRepo';

const UploadRomPage = (): React.JSX.Element => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState<number>(2026);
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);
  const [multiplayer, setMultiplayer] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [submit, setSubmit] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const addTag = () => {
    const tagValue = tag.trim();

    if (!tagValue || tags.includes(tagValue)) return;

    setTags((prev) => [...prev, tagValue]);

    setTag('');
  };

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const chosenFile = event.target.files ? Array.from(event.target.files) : [];

    setImages(chosenFile);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmit(true);

    setStatusMessage('');

    try {
      const response = await uploadRom({
        title,
        description,
        tags,
        year,
        completed,
        multiplayer,
        images,
      });

      setStatusMessage(response.message ?? 'ROM uploaded successfully.');
      setTitle('');
      setDescription('');
      setYear(2000);
      setTags([]);
      setTag('');
      setCompleted(false);
      setMultiplayer(false);
      setImages([]);
    } catch (error) {
    } finally {
      setSubmit(false);
    }
  };

  return (
    <main className="max-w-[900px] mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 font-[Oxygen]">Upload ROM</h2>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <Input
          id="upload-rom-title"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <Input
          id="upload-rom-description"
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <Input
          id="upload-rom-year"
          label="Year"
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          required
        />

        <div>
          <Input
            id="upload-rom-tag"
            label="Tags"
            placeholder="Add a tag and click Add"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            actions={
              <Button
                type="button"
                className="px-3 py-1 border border-slate-300 rounded"
                onClick={addTag}
              >
                Add
              </Button>
            }
          />
          {tags.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Button
                  key={tag}
                  type="button"
                  className="text-sm px-2 py-1 border border-slate-300 rounded"
                  onClick={() => removeTag(tag)}
                >
                  {tag} x
                </Button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
            Completed
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={multiplayer}
              onChange={(e) => setMultiplayer(e.target.checked)}
            />
            Multiplayer
          </label>
        </div>

        <Input
          id="upload-rom-images"
          label="Images"
          type="file"
          multiple
          accept="image/*"
          onChange={onImageChange}
        />

        {images.length > 0 ? (
          <p className="text-sm text-slate-600">
            {images.length} image(s) selected.
          </p>
        ) : null}

        <Button
          type="submit"
          className="w-fit px-4 py-2 border border-slate-300 rounded"
          disabled={submit}
        >
          {submit ? 'Uploading...' : 'Upload ROM'}
        </Button>

        {statusMessage ? (
          <p className="text-green-700">{statusMessage}</p>
        ) : null}
      </form>
    </main>
  );
};

export default UploadRomPage;
