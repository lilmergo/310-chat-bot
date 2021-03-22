
import java.io.StringReader;
import java.util.List;

import edu.stanford.nlp.ling.HasWord;
import edu.stanford.nlp.ling.TaggedWord;
import edu.stanford.nlp.parser.shiftreduce.ShiftReduceParser;
import edu.stanford.nlp.process.DocumentPreprocessor;
import edu.stanford.nlp.tagger.maxent.MaxentTagger;
import edu.stanford.nlp.trees.Tree;

/**
 * Demonstrates how to first use the tagger, then use the
 * ShiftReduceParser.  Note that ShiftReduceParser will not work
 * on untagged text.
 *
 * @author John Bauer
 */
public class ShiftReduceDemo {
  public static void main(String[] args) {
    String modelPath = "/u/nlp/data/srparser/englishSR.ser.gz";
    String taggerPath = "/u/nlp/data/pos-tagger/distrib/english-left3words-distsim.tagger";

    for (int argIndex = 0; argIndex < args.length; ) {
      if (args[argIndex].equals("-tagger")) {
        taggerPath = args[argIndex + 1];
        argIndex += 2;
      } else if (args[argIndex].equals("-model")) {
        modelPath = args[argIndex + 1];
        argIndex += 2;
      } else {
        throw new RuntimeException("Unknown argument " + args[argIndex]);
      }
    }

    String text = "My dog likes to shake his stuffed chickadee toy.";

    MaxentTagger tagger = new MaxentTagger(taggerPath);
    ShiftReduceParser model = ShiftReduceParser.loadModel(modelPath);

    DocumentPreprocessor tokenizer = new DocumentPreprocessor(new StringReader(text));
    for (List<HasWord> sentence : tokenizer) {
      List<TaggedWord> tagged = tagger.tagSentence(sentence);
      Tree tree = model.apply(tagged);
      System.err.println(tree);
    }
  }
}
